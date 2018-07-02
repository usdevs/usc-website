import moment from 'moment'
import _ from 'lodash'
import { isLoaded } from 'react-redux-firebase';
import { config } from '../resources/config'

export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function roundTime(time, minInterval) {
  const remainder = minInterval - (time.minute() % minInterval);
  const remSecs = -(time.second() % 60);

  return time.clone().add(remainder, "minutes").add(remSecs, "seconds")
}

export function isToday(datetime) {
  return moment().isSame(datetime, 'day')
}

export function getEventStart(event) {
  return moment(event.startDate.toDate())
}

export function getEventEnd(event) {
  return moment(event.endDate.toDate())
}

export function getEventsBetween(events, time) {
  return _.filter(events, (event) => {
    const eventStart = getEventStart(event)
    const eventEnd = getEventEnd(event)

    return time.isBetween(eventStart, eventEnd, 'minute', '[)')
  })
}

export function eventTimesToMoment(event) {
  return {
    ...event,
    startDate: moment(event.startDate.toDate()),
    endDate: moment(event.endDate.toDate())
  }
}

export function formatFirestoreEvent(event, eventID) {
  return {
    ...eventTimesToMoment(event),
    id: eventID
  }
}

//Arrange events into arrays of events with a key of the date
export function getEventsByDate(firestore) {
  const { eventsStartInMth, eventsEndInMth } = firestore.data

  if (!isLoaded(eventsStartInMth) || !isLoaded(eventsEndInMth) || !eventsStartInMth || !eventsEndInMth) {
    return null
  }

  //Combine all events with a start date in the month, and an end date in the month
  const allEvents = _.merge(eventsStartInMth, eventsEndInMth)

  var eventsByDate = {}

  //Function that combines the arrays
  const eventCombiner = (initEventArr, addEventArr) => {
    if(!initEventArr) {
      return addEventArr
    } else {
      return _.concat(initEventArr, addEventArr)
    }
  }

  //Iterate through all events
  _.forOwn(allEvents, function(event, eventID) {
    //Convert any formats needed after retrieval from firestore
    var newEvent = formatFirestoreEvent(event, eventID)
    const noOfDays = moment.duration(newEvent.startDate.diff(newEvent.endDate)).days()
    const initialStartDate = newEvent.startDate.clone().startOf('day')

    for(var day = 0; day <= noOfDays; day++) {
        //Trivial case if noOfDays=0, handle multi day if otherwise
      if (noOfDays === 0) {
        _.mergeWith(eventsByDate, {[initialStartDate.toString()]: [newEvent]}, eventCombiner)
      } else {
        const tempStartDate = initialStartDate.clone().add(day, 'day')

        /* Manipulation of Date Data for Multiday
         * endDate of the first day of a multiDay event will be midnight
         * startDate and endDate of a middle day will be the start mn and end mn
         * startDate of thelast day of a multiDay event will be midnight
         */
        if(day === 0) {
          newEvent = {
            ...newEvent,
            endDate: tempStartDate.clone().endOf('day')
          }
        } else if (day === noOfDays) {
          newEvent = {
            ...newEvent,
            startDate: tempStartDate.clone().startOf('day')
          }
        } else {
          newEvent = {
            ...newEvent,
            startDate: tempStartDate.clone().startOf('day'),
            endDate: tempStartDate.clone().endOf('day')
          }
        }

        _.mergeWith(eventsByDate, {[tempStartDate.toString()]: [newEvent]}, eventCombiner)
      }
    }
  });

  return _.mapValues(eventsByDate, (dayEvents) => _.sortBy(dayEvents, 'startDate'))
}

//Arrange events into arrays of events with a key of the date
export function getEventsByDateTimeAndVenue(firestore, ignoreStandardSpaces = true) {
  const eventsByDate = getEventsByDate(firestore)
  const { spaces } = firestore.data

  return _.mapValues(eventsByDate, (dayEvents) => {
    //Array that will contain any venue present in any event for the day
    var venuesUsed = []
    var eventsByDateTime = {}

    _.forEach(dayEvents, (event) => {
      if (ignoreStandardSpaces && !_.includes(_.keys(spaces), event.venue)) {
        return
      }

      const duration = moment.duration(event.endDate.diff(event.startDate))
      const noOfTimeslots = ((duration.days() * 24 + duration.hours()) * 60 + duration.minutes()) / 30

      const timeslotCombiner = (initEventArr, addEventArr) => {
        if(!initEventArr) {
          return addEventArr
        } else {
          return _.concat(initEventArr, addEventArr)
        }
      }

      if(venuesUsed.length === 0) {
        venuesUsed = [event.venue]
      } else {
        venuesUsed = _.union(venuesUsed, [event.venue]);
      }

      for(var timeslot = 0; timeslot <= noOfTimeslots; timeslot++) {
        const tempStartTime = event.startDate.clone().add(config.timeInterval * timeslot, 'minutes')

        if (timeslot < noOfTimeslots) {
          _.merge(eventsByDateTime, {[tempStartTime.toString()]: {
            [event.venue] : {
              event: event,
              isStart: timeslot === 0,
              isEnd: timeslot === noOfTimeslots - 1
            }
          }})
        } else {
          _.merge(eventsByDateTime, {[tempStartTime.toString()]: {blank: true} })
        }
      }
    });

    return {
      timeslots: eventsByDateTime,
      venuesUsed: venuesUsed
    }
  })
}

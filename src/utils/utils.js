import moment from 'moment'
import _ from 'lodash'
import { isLoaded } from 'react-redux-firebase';
import { config } from '../resources/config'

export function newUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

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
  const newEvent = eventTimesToMoment(event)
  return {
    ...newEvent,
    id: eventID,
    original: {
      startDate: newEvent.startDate.clone(),
      endDate: newEvent.endDate.clone()
    }
  }
}

export function formatEvents(firestore, alias, isArr) {
  if (isArr) {
    const events = firestore.ordered[alias]
    var newEventsArr = []

    _.forEach(events, (event) => {
      newEventsArr.push(formatFirestoreEvent(event, event.id))
    })

    return newEventsArr
  } else {
    const events = firestore.data[alias]
    var newEventsObj = {}

    _.forOwn(events, (event, eventID) => {
      newEventsObj = {
        ...newEventsObj,
        [eventID]: formatFirestoreEvent(event, eventID),
      }
    })

    return newEventsObj
  }
}

export function formatMonthEvents(firestore) {
  const { eventsStartInMth, eventsEndInMth } = firestore.data

  if (!isLoaded(eventsStartInMth) || !isLoaded(eventsEndInMth) || !eventsStartInMth || !eventsEndInMth) {
    return null
  }

  //Iterate through all events
  var newEvents = {}
   _.forOwn(_.merge(eventsStartInMth, eventsEndInMth), function(Event, eventID) {
     if(!Event) {
       return false
     }
    //Convert any formats needed after retrieval from firestore
    newEvents = {
      ...newEvents,
      [eventID]: formatFirestoreEvent(Event, eventID)
    }
  })

  return newEvents
}

//Arrange events into arrays of events with a key of the date
export function formatEventsByDate(firestore, hideSpaceOnly = false) {
  //Combine all events with a start date in the month, and an end date in the month
  const allEvents = formatMonthEvents(firestore)

  if(!allEvents) {
    return null
  }

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
  _.forOwn(allEvents, function(Event, eventID) {
    if(hideSpaceOnly && Event.spaceOnly) {
      return
    }

    //Convert any formats needed after retrieval from firestore
    var event = formatFirestoreEvent(Event, eventID)
    const noOfDays = moment.duration(event.endDate.diff(event.startDate)).days()
    const initialStartDate = event.startDate.clone().startOf('day')

    for(var day = 0; day <= noOfDays; day++) {
        //Trivial case if noOfDays=0, handle multi day if otherwise
      var newEvent = event
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
            endDate: tempStartDate.clone().endOf('day'),
            fullDay: true
          }
        }

        _.mergeWith(eventsByDate, {[tempStartDate.toString()]: [newEvent]}, eventCombiner)
      }
    }
  });

  return _.mapValues(eventsByDate, (dayEvents) => _.sortBy(dayEvents, 'startDate'))
}

//Arrange events into arrays of events with a key of the date
export function formatEventsByDateTimeAndVenue(firestore, ignoreStandardSpaces = true) {
  const eventsByDate = formatEventsByDate(firestore)
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

      if(venuesUsed.length === 0) {
        venuesUsed = [event.venue]
      } else {
        venuesUsed = _.union(venuesUsed, [event.venue]);
      }

      for(var timeslot = 0; timeslot <= noOfTimeslots; timeslot++) {
        const tempStartTime = event.startDate.clone().add(config.timeInterval * timeslot, 'minutes').seconds(0)

        if (timeslot < noOfTimeslots) {
          _.merge(eventsByDateTime, {[tempStartTime.toString()]: {
            displayText: tempStartTime.format("hh:mm a"),
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

export function eventTimeDisplay(event, selectedDate) {
  if (event.fullDay) {
    return ('Full Day')
  } else if (event.startDate.isSame(event.endDate, 'day')) {
    return (event.startDate.format('hh:mm a') + ' - ' + event.endDate.format('hh:mm a'))
  } else {
    if(selectedDate.isSame(event.original.startDate, 'day')) {
      return ('starts at ' + event.startDate.format('hh:mm a'))
    } else {
      return ('ends at ' + event.endDate.format('hh:mm a'))
    }
  }
}

export function formatModulesIntoTypes(firestore) {
  const { modules } = firestore.ordered

  var modulesByType = {}

  _.forEach(modules, (module) => {
    const { type } = module

    if(!modulesByType[type]) {
      modulesByType[type] = [module]
    } else {
      modulesByType[type] = modulesByType[type].concat(module)
    }
  })

  return modulesByType
}

export function formatFirestoreData(firestore, alias) {
  return {
    isLoaded: firestore.data[alias] && firestore.ordered[alias] ? true : false,
    ordered: firestore.ordered[alias],
    data: firestore.data[alias]
  }
}

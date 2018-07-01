import moment from 'moment'
import _ from 'lodash'
import { isLoaded } from 'react-redux-firebase';
import { timeInterval } from '../resources/config'

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

export function eventCombiner(initEventArr, addEventArr) {
  if(!initEventArr) {
    return addEventArr
  } else {
    return _.concat(initEventArr, addEventArr)
  }
}

//Arrange events into arrays of events with a key of the date
export function getEventsByDate(firestore) {
  const { eventsStartInMth, eventsEndInMth } = firestore.data

  if (!isLoaded(eventsStartInMth) || !isLoaded(eventsEndInMth) || !eventsStartInMth || !eventsEndInMth) {
    return null
  }

  const allEvents = _.merge(eventsStartInMth, eventsEndInMth)

  var eventsByDate = {}

  _.forOwn(allEvents, function(event, eventID) {
    const newEvent = formatFirestoreEvent(event, eventID)
    const noOfDays = moment.duration(newEvent.startDate.diff(newEvent.endDate)).days()
    const initialStartDate = newEvent.startDate.clone().startOf('day')

    //Trivial case if noOfDays=0, handle multi day if otherwise
    if (noOfDays === 0) {
      _.mergeWith(eventsByDate, {[initialStartDate.toString()]: [newEvent]}, eventCombiner)
    } else {
      for(var day = 1; day <= noOfDays; day++) {
        const tempStartDate = initialStartDate.clone().add(day, 'day')
        _.mergeWith(eventsByDate, {[tempStartDate.toString()]: [newEvent]}, eventCombiner)
      }
    }
  });

  return _.mapValues(eventsByDate, (dayEvents) => _.sortBy(dayEvents, 'startDate'))
}

//Arrange events into arrays of events with a key of the date
export function getEventsByTime(firestore, ignoreStandardSpaces = true) {
  const { eventsStartInMth, eventsEndInMth, spaces } = firestore.data

  if (!isLoaded(eventsStartInMth) || !isLoaded(eventsEndInMth) || !eventsStartInMth || !eventsEndInMth || !isLoaded(spaces)) {
    return null
  }

  const allEvents = _.merge(eventsStartInMth, eventsEndInMth)

  var eventsByDate = {}
  console.log(allEvents)

  _.forOwn(allEvents, function(event, eventID) {
    if (!_.includes(_.keys(spaces), event.venue)) {
      return
    }
      console.log(event)

    const newEvent = formatFirestoreEvent(event, eventID)
    const noOfTimeslots = moment.duration(newEvent.endDate.diff(newEvent.startDate)).minutes() / 30

    //Trivial case if noOfDays=0, handle multi day if otherwise
    for(var timeslot = 0; timeslot <= noOfTimeslots; timeslot++) {
      const tempStartTime = newEvent.startDate.clone().add(timeInterval * timeslot, 'minutes')
      _.merge(eventsByDate, {[tempStartTime.toString()]: {
        [newEvent.venue] : newEvent
      }})
        console.log(eventsByDate)
    }
  });
  console.log(eventsByDate)
  return eventsByDate
}

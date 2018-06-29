import moment from 'moment'
import _ from 'lodash'

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

export function getEventByDay(events, day) {
  if(isEmpty(events)) {
    return []
  }

  return events.filter((event) => {
    const startDate = moment(event.startDate.toDate())
    const endDate = moment(event.endDate.toDate())

    return startDate >= day.clone().startOf('day') && endDate <= day.clone().endOf('day')
  })
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

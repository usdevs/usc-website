import moment from 'moment'

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

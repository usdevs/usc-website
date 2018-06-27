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

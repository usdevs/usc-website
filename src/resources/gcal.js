import GoogleCalendar from '../utils/GoogleCalendar'
import moment from 'moment'
import lodash from 'lodash'

export const calendars = [
  {
    name: 'USCalendar',
    url: 'ggoope87t0hgl8u9upt44vv8bs@group.calendar.google.com'
  }
]

const dailyRecurrence = 700
const weeklyRecurrence = 100
const monthlyRecurrence = 20
const gcalAPIKey = 'AIzaSyA0vELTTzgWbSlZ1DkQu5JChe6u40xs75k'
export const dayFormat = 'DDMMYYYY'

export function processData(events, callback) {
  var gEvents = {}
  events.map((event) => {
    const details = lodash.split(event.location, '/', 2);
    event = {
      ...event,
      type: lodash.trim(details[0]),
      venue: details.length > 1 ? lodash.trim(details[1]) : ""
    }
    const date = moment(event.start).format(dayFormat)
    var dayEvents = gEvents[date] ? gEvents[date].slice() : [];
    dayEvents.push(event);

    gEvents = {
      ...gEvents,
      [date]: dayEvents
    }
  })

  callback(gEvents)
}

export function getGoogleCalendarEvents(callback) {

  GoogleCalendar.getAllCalendars(gcalAPIKey, calendars, dailyRecurrence, weeklyRecurrence, monthlyRecurrence)
    .then(events => processData(events, callback))
    .catch(err => { throw new Error(err) })
}

export function getDescriptionIconColor(event) {
  switch(event.type) {
    case 'Academic':
      return 'dodgerblue';
    case 'Theme Room 2':
      return 'red';
    case 'Chatterbox':
      return 'green';
    default: 'black';
  }
}

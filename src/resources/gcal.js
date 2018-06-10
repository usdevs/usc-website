import GoogleCalendar from '../utils/GoogleCalendar'

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

export function getGoogleCalendarEvents(callback) {
  GoogleCalendar.getAllCalendars(gcalAPIKey, calendars, dailyRecurrence, weeklyRecurrence, monthlyRecurrence)
    .then(events => callback(events))
    .catch(err => { throw new Error(err) })
}

export function getVenueIconStyle(venue) {
  switch(venue) {
    case 'Theme Room 1':
      return {
        height: '10px',
        width: '10px',
        backgroundColor: 'dodgerblue',
      };
    case 'Theme Room 2':
      return {
        height: '10px',
        width: '10px',
        backgroundColor: 'red',
      };
    case 'Chatterbox':
      return {
        height: '10px',
        width: '10px',
        backgroundColor: 'green',
      };
    default:
      return {
        height: '10px',
        width: '10px',
        backgroundColor: 'black',
      };
  }
}

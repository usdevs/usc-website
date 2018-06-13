import GoogleCalendar from '../utils/GoogleCalendar'
import { dispatch } from 'redux'
import moment from 'moment'

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

export function getGoogleCalendarEvents(callback) {

  GoogleCalendar.getAllCalendars(gcalAPIKey, calendars, dailyRecurrence, weeklyRecurrence, monthlyRecurrence)
    .then(events => callback(events))
    .catch(err => { throw new Error(err) })
}

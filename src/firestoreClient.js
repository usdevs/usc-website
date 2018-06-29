import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { firebaseDateFormat } from './resources/config'

export function createEvent(firestore, event, callback) {
  firestore
  .add({ collection: 'events' }, {
    name: event.name,
    type: event.type,
    venue: event.venue,
    otherVenue: event.otherVenue,
    multiDay: event.multiDay,
    startDate: event.startDate.format(firebaseDateFormat),
    endDate: event.endDate.format(firebaseDateFormat)})
  .then(() => callback())
}

export function createTestEvent(firebase) {
  var event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2018-06-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2018-06-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'},
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};
firebase
.push('events', event)
.then(() => {
  console.log('success')
})
}

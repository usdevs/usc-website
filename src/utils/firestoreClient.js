export function createEvent(firestore, event, uid, callback) {
  firestore
  .add({ collection: 'events' }, {
    name: event.name,
    type: event.type,
    venue: event.otherVenueSelected ? event.otherVenue : event.venue,
    otherVenueSelected: event.otherVenueSelected,
    multiDay: event.multiDay,
    startDate: event.startDate.toDate(),
    endDate: event.endDate.toDate(),
    creator: uid
  })
  .then(() => callback())
}

export function getEvents(firestore, month, spaceOnly, callback) {
  var query = { collection: 'events', orderBy: ['startDate'] }
  var where = []

  if (month) {
    where.push(['startDate', '>=', month.startOf('month').toDate()])
    where.push(['startDate', '<=', month.endOf('month').toDate()])
  }

  if (spaceOnly) {
    where.push(['otherVenueSelected', '==', false])
  }

  if (where.length > 0) {
    query = {
      ...query,
      where: where
    }
  }

  firestore
  .get(query)
  .then(() => callback())
}

export function getEventsAfter(firestore, date, limit) {
  firestore
  .get({
    collection: 'events',
    where: [
      ['startDate', '>=', date.toDate()]
    ],
    orderBy: ['startDate'],
    limit: limit})
}

export function watchEvents(firestore) {
  firestore.setListeners([
    { collection: 'events' },
  ])
}

export function getEventTypes(firestore) {
  firestore
  .get({ collection: 'eventTypes', orderBy: ['name'] })
}
export function getSpaces(firestore) {
  firestore
  .get({ collection: 'spaces', orderBy: ['name'] })
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

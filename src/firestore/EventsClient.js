import _ from 'lodash'

export function formatFirestoreEvent(event) {
  if(event.regLink && event.regLink !== '' && !(event.regLink.startsWith("http://") || event.regLink.startsWith("https://"))) {
    event = {
      ...event,
      regLink: "http://" + event.regLink
    }
  }

  event = {
    ...event,
    startDate: event.startDate.toDate(),
    endDate: event.endDate.toDate(),
  }

  return _.pickBy(event, _.identity)
}

export function createEvent(firestore, event, callback, errorCallback) {
  firestore
  .add({ collection: 'events' }, formatFirestoreEvent(event))
  .then(() => callback())
  .catch((err) => errorCallback(err))
}

export function updateEvent(firestore, event, callback, errorCallback) {
  const newEvent = formatFirestoreEvent(event)

  firestore
  .set({ collection: 'events', doc: event.id }, newEvent)
  .then(() => callback(newEvent))
  .catch((err) => errorCallback(err))
}

export function deleteEvent(firestore, event, callback) {
  firestore
  .delete({ collection: 'events', doc: event.id })
  .then(() => callback())
}

export function getEventTypes(firestore) {
  firestore
  .get({ collection: 'eventTypes', orderBy: ['name'] })
}

export function getSpaces(firestore) {
  firestore
  .get({ collection: 'spaces', orderBy: ['name'] })
}


export function getEvents(firestore, callback = () => {}, month = null, spaceOnly = false, startInMonth = true) {
  var query = { collection: 'events', orderBy: ['startDate'] }
  var where = []

  if (month) {
    const dateField = startInMonth ? 'startDate' : 'endDate'
    where.push([dateField, '>=', month.clone().startOf('month').add(-1, 'month').toDate()])
    where.push([dateField, '<=', month.clone().endOf('month').add(1, 'month').toDate()])

    const nameField = startInMonth ? 'eventsStartInMth' : 'eventsEndInMth'
    query = {
      ...query,
      storeAs: nameField,
      orderBy: [dateField]
    }
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

  firestore
  .onSnapshot(query)
}

export function getGroupEvents(firestore, groupID, callback = () => {}) {
  firestore
  .get({
    collection: 'events',
    where: ['organisedBy', '==', groupID],
    orderBy: ['startDate', 'desc'],
    storeAs: 'groupEvents'
  })
  .then((snapshot) => callback(snapshot))
}

export function getEventsAfter(firestore, callback, alias, date, limit) {
  firestore
  .get({
    collection: 'events',
    where: [
      ['endDate', '>=', date.toDate()]
    ],
    orderBy: ['endDate'],
    storeAs: alias,
    limit: limit})
}

export function getEvent(firestore, eventID, callback) {
  firestore
  .get({
    collection: 'events',
    doc: eventID,
    storeAs: 'event'})
  .then((snapshot) => callback(snapshot))
}

export function getEventVenueBookingsAfter(firestore, venueID, date, alias, callback) {
  firestore
  .get({
    collection: 'events',
    where: [
      ['endDate', '>=', date.toDate()],
      ['venue', '==', venueID]
    ],
    orderBy: ['endDate'],
    storeAs: alias})
  .then((snapshot) => callback(snapshot))
}

export function getUserEvents(firestore, userID, callback) {
  firestore
  .get({
    collection: 'events',
    where: [
      ['creator', '==', userID]
    ],
    orderBy: ['startDate', 'desc'],
    storeAs: 'userEvents'})
  .then((snapshot) => callback(snapshot))
}

export function watchEvents(firestore) {
  firestore.setListeners([
    { collection: 'events' },
  ])
}

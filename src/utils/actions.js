import {
  createEvent as createFirestoreEvent,
  getEvents as getFirestoreEvents,
  getEventsAfter as getFirestoreEventsAfter,
  getEventTypes as getFirestoreEventTypes,
  getSpaces as getFirestoreSpaces,
  watchEvents as watchFirestoreEvents
} from './firestoreClient'
import {
  createEvent as createGoogleEvent,
} from './googleAPIClient'
import moment from 'moment'

export function createEvent(firestore, event, uid, spaces, callback) {
  createGoogleEvent(event, spaces, (googleEntry) => {
    createFirestoreEvent(firestore, event, uid, googleEntry.id, callback)
  })
}

export function getEvents(firestore, callback = () => {}, month = null, spaceOnly = false) {
  getEventTypes(firestore)
  getSpaces(firestore)

  if(month) {
    getFirestoreEvents(firestore, callback, spaceOnly, month, true)
    getFirestoreEvents(firestore, callback, spaceOnly, month, false)
  } else {
    getFirestoreEvents(firestore, callback, spaceOnly)
  }

  watchFirestoreEvents(firestore)
}

export function getUpcomingEvents(firestore, limit) {
  getEvents(firestore)
  getFirestoreEventsAfter(firestore, null, 'upcomingEvents', moment(), limit)
}

export function getEventTypes(firestore) {
  getFirestoreEventTypes(firestore)
}

export function getSpaces(firestore) {
  getFirestoreSpaces(firestore)
}

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
    getEventsByMonth(firestore, callback, month, spaceOnly)
  } else {
    getFirestoreEvents(firestore, callback, spaceOnly)
  }

  watchFirestoreEvents(firestore)
}

export function getEventsByMonth(firestore, callback = () => {}, month, spaceOnly = false) {
  getFirestoreEvents(firestore, callback, month, spaceOnly, true)
  getFirestoreEvents(firestore, callback, month, spaceOnly, false)
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

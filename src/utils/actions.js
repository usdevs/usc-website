import {
  createEvent as createFirestoreEvent,
  getEvents as getFirestoreEvents,
  getEventsAfter as getFirestoreEventsAfter,
  getEventTypes as getFirestoreEventTypes,
  getSpaces as getFirestoreSpaces,
  watchEvents as watchFirestoreEvents,
  uploadFile as uploadFirebaseFile,
  deleteFile as deleteFirebaseFile
} from './firestoreClient'
import {
  createEvent as createGoogleEvent,
} from './googleAPIClient'
import moment from 'moment'
import { config } from '../resources/config'

export function createEvent(firestore, firebase, event, uid, spaces, callback) {
  createGoogleEvent(event, spaces, (googleEntry) => {
    if (event.poster) {
      uploadPoster(firebase, event.poster, (filePath) => {
        event = {
          ...event,
          poster: filePath,
        }
        console.log(event)
        createFirestoreEvent(firestore, event, uid, googleEntry.id, callback)
      })
    } else {
      event = {
        ...event,
        poster: null,
      }
      createFirestoreEvent(firestore, event, uid, googleEntry.id, callback)
    }
  })
}

export function uploadPoster(firebase, poster, callback) {
  uploadFirebaseFile(firebase, config.posterFilePath, poster, callback)
}

export function deletePoster(firebase, file, key) {
  deleteFirebaseFile(firebase, file, key)
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

import {
  createEvent as createFirestoreEvent,
  updateEvent as updateFirestoreEvent,
  deleteEvent as deleteFirestoreEvent,
  getEvent as getFirestoreEvent,
  getEvents as getFirestoreEvents,
  getEventsAfter as getFirestoreEventsAfter,
  getEventVenueBookingsAfter as getFirestoreEventVenueBookingsAfter,
  getEventTypes as getFirestoreEventTypes,
  getGroupEvents as getFirestoreGroupEvents,
  getUserEvents as getFirestoreUserEvents,
  getSpaces as getFirestoreSpaces,
  watchEvents as watchFirestoreEvents,
} from '../firestore/EventsClient'
import {
  uploadFile as uploadFirebaseFile,
  deleteFile as deleteFirebaseFile,
} from '../firestore/FilesClient'
import {
  createEvent as createGoogleEvent,
  updateEvent as updateGoogleEvent,
  deleteEvent as deleteGoogleEvent
} from '../utils/googleAPIClient'
import moment from 'moment'
import { config } from '../resources/config'

//Create, Update and Delete

export function createEvent(firestore, firebase, event, callback = () => {}, errorCallback = () => {}) {
  if(event.poster && !event.internal) {
    uploadPoster(firebase, event.poster, (filePath) => {
      event = {
        ...event,
        poster: filePath,
      }

      createGoogleEvent(event, (googleEntry) => {
        event = {
          ...event,
          gCalID: googleEntry.id,
        }

        createFirestoreEvent(firestore, event, callback, errorCallback)
      })
    })
  } else if (event.poster) {
    uploadPoster(firebase, event.poster, (filePath) => {
      event = {
        ...event,
        poster: filePath,
      }

      createFirestoreEvent(firestore, event, callback, errorCallback)
    })
  } else if (!event.internal) {
    createGoogleEvent(event, (googleEntry) => {
      event = {
        ...event,
        gCalID: googleEntry.id,
      }

      createFirestoreEvent(firestore, event, callback, errorCallback)
    })
  } else {
    createFirestoreEvent(firestore, event, callback, errorCallback)
  }
}

export function updateEvent(firestore, firebase, event, originalEvent, callback = () => {}, errorCallback = () => {}) {
  const actionHandleGCal = (firestore, firebase, event, originalEvent, callback) => {
    //If there are any changes in whether the event is internal or external
    //Else update GCal if it exist, and update Firestore
    if(originalEvent.internal !== event.internal) {
      //If it is now internal, delete the GCal event and update
      //Else it means, it is now not internal, create a GCal and update
      if(event.internal) {
        deleteGoogleEvent(event, () => {
          event = {
            ...event,
            gCalID: null
          }

          updateFirestoreEvent(firestore, event, () => callback(event), errorCallback)
        })
      } else {
        createGoogleEvent(event, (googleEntry) => {
          event = {
            ...event,
            gCalID: googleEntry.id
          }

          updateFirestoreEvent(firestore, event, () => callback(event), errorCallback)
        })
      }
    } else {
      if(event.gCalID) {
        updateGoogleEvent(event, () => {})
      }

      updateFirestoreEvent(firestore, event, () => callback(event), errorCallback)
    }
  }

  //If there are changes in the poster
  //Else just update GCal and firestoreReducer
  if(originalEvent.poster !== event.poster) {
    //Delete the original poster file if it exists
    if(originalEvent.poster) {
      deleteFirebaseFile(firebase, originalEvent.poster, () => {})
    }

    //If there is a new poster file. Upload it and then update GCal and Firestore
    //Else just update GCal and Firestore
    if(event.poster) {
      uploadPoster(firebase, event.poster, (filePath) => {
        event = {
          ...event,
          poster: filePath,
        }

        actionHandleGCal(firestore, firebase, event, originalEvent, callback)
      })
    } else {
      actionHandleGCal(firestore, firebase, event, originalEvent, callback)
    }
  } else {
    actionHandleGCal(firestore, firebase, event, originalEvent, callback)
  }
}

export function deleteEvent(firestore, firebase, event, callback) {
  if(event.poster) {
    deleteFirebaseFile(firebase, event.poster, () => {})
  }

  if(event.gCalID) {
    deleteGoogleEvent(event, callback)
  }

  deleteFirestoreEvent(firestore, event, callback)
}

//Read

export function getEvent(firestore, eventID, callback = () => {}) {
  getEventTypes(firestore)
  getSpaces(firestore)

  getFirestoreEvent(firestore, eventID, callback)
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

export function getEventVenueBookingsAfter(firestore, venueID, date, alias = 'venueBookings', callback = () => {}) {
  getFirestoreEventVenueBookingsAfter(firestore, venueID, date, alias, callback)
}

export function getEventsByMonth(firestore, callback = () => {}, month, spaceOnly = false) {
  getFirestoreEvents(firestore, callback, month, spaceOnly, true)
  getFirestoreEvents(firestore, callback, month, spaceOnly, false)
  watchFirestoreEvents(firestore)
}

export function getUpcomingEvents(firestore, limit) {
  getEvents(firestore)
  getFirestoreEventsAfter(firestore, null, 'upcomingEvents', moment(), limit)
}

export function getUserEvents(firestore, userID, callback = () => {}) {
  getEvents(firestore)
  getFirestoreUserEvents(firestore, userID, callback)
}

export function getGroupEvents(firestore, groupID, callback = () => {}) {
  getEvents(firestore)
  getFirestoreGroupEvents(firestore, groupID, callback)
}

export function getEventTypes(firestore) {
  getFirestoreEventTypes(firestore)
}

export function getSpaces(firestore) {
  getFirestoreSpaces(firestore)
}

//Utility

export function uploadPoster(firebase, poster, callback) {
  uploadFirebaseFile(firebase, config.posterFilePath, poster, callback)
}

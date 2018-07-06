/* global gapi */

import {
  createEvent as createFirestoreEvent,
  getEvents as getFirestoreEvents,
  getEventsAfter as getFirestoreEventsAfter,
  getEventTypes as getFirestoreEventTypes,
  getSpaces as getFirestoreSpaces,
  watchEvents as watchFirestoreEvents,
  uploadFile as uploadFirebaseFile,
  deleteFile as deleteFirebaseFile,
  getUserEvents as getFirestoreUserEvents,
  updateEvent as updateFirestoreEvent,
  deleteEvent as deleteFirestoreEvent,
  getFile as getFirestoreFile,
  getUserProfile as getFirestoreUserProfile,
  getUserProfileByEmail as getFirestoreUserProfileByEmail,
  createInterestGroup as createFirestoreInterestGroup,
  updateInterestGroup as updateFirestoreInterestGroup,
  deleteGroup as deleteFirestoreGroup,
  getInterestGroupTypes as getFirestoreInterestGroupTypes,
  getInterestGroups as getFirestoreInterestGroups,
  getUserInterestGroups as getFirestoreUserInterestGroups,
  getGroup as getFirestoreGroup,
} from './firestoreClient'
import {
  createEvent as createGoogleEvent,
  updateEvent as updateGoogleEvent,
  deleteEvent as deleteGoogleEvent
} from './googleAPIClient'
import moment from 'moment'
import { config } from '../resources/config'
import { firebaseConfig } from '../resources/config'

export function createEvent(firestore, firebase, event, uid, spaces, callback) {

  const action = (firestore, firebase, event, uid, spaces, callback) => {
    if(!event.internal) {
      createGoogleEvent(event, spaces, (googleEntry) => {
        createFirestoreEvent(firestore, event, uid, googleEntry.id, callback)
      })
    } else {
      createFirestoreEvent(firestore, event, uid, null, callback)
    }
  }

  //Because upload poster is a callback. thus u cannot combine the two functions
  if (event.poster) {
    uploadPoster(firebase, event.poster, (filePath) => {
      event = {
        ...event,
        poster: filePath,
      }

      action(firestore, firebase, event, uid, spaces, callback)
    })
  } else {
    action(firestore, firebase, event, uid, spaces, callback)
  }
}

export function updateEvent(firestore, firebase, event, uid, spaces, callback) {
  const actionHandleGCal = (firestore, firebase, event, uid, spaces, callback) => {
    //If there are any changes in whether the event is internal or external
    //Else update GCal if it exist, and update Firestore
    if(event.original.internal !== event.internal) {
      //If it is now internal, delete the GCal event and update
      //Else it means, it is now not internal, create a GCal and update
      if(event.internal) {
        deleteGoogleEvent(event, () => {
          event = {
            ...event,
            gCalID: null
          }

          updateFirestoreEvent(firestore, event, uid, () => callback(event))
        })
      } else {
        createGoogleEvent(event, spaces, (googleEntry) => {
          event = {
            ...event,
            gCalID: googleEntry.id
          }
            updateFirestoreEvent(firestore, event, uid, () => callback(event))
        })
      }
    } else {
      if(event.gCalID) {
        updateGoogleEvent(event, spaces, () => {})
      }

      updateFirestoreEvent(firestore, event, uid, () => callback(event))
    }
  }

  //If there are changes in the poster
  //Else just update GCal and Firestore
  if(event.original.poster !== event.poster) {
    //Delete the original poster file if it exists
    if(event.original.poster) {
      deleteFirebaseFile(firebase, event.original.poster, () => {})
    }

    //If there is a new poster file. Upload it and then update GCal and Firestore
    //Else just update GCal and Firestore
    if(event.poster) {
      uploadPoster(firebase, event.poster, (filePath) => {
        event = {
          ...event,
          poster: filePath,
        }

        actionHandleGCal(firestore, firebase, event, uid, spaces, callback)
      })
    } else {
      actionHandleGCal(firestore, firebase, event, uid, spaces, callback)
    }
  } else {
    actionHandleGCal(firestore, firebase, event, uid, spaces, callback)
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

export function uploadPoster(firebase, poster, callback) {
  uploadFirebaseFile(firebase, config.posterFilePath, poster, callback)
}

export function uploadLogo(firebase, logo, callback) {
  uploadFirebaseFile(firebase, config.logoFilePath, logo, callback)
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
  watchFirestoreEvents(firestore)
}

export function getUpcomingEvents(firestore, limit) {
  getEvents(firestore)
  getFirestoreEventsAfter(firestore, null, 'upcomingEvents', moment(), limit)
}

export function getUserEvents(firestore, userID) {
  getEvents(firestore)
  getFirestoreUserEvents(firestore, userID)
}

export function getMyProfile(firestore, auth, callback) {
  getFirestoreUserProfile(firestore, auth.uid, callback)
}

export function getUserProfile(firestore, userID, callback) {
  getFirestoreUserProfile(firestore, userID, callback)
}

export function getUserByEmail(firestore, email, callback) {
  getFirestoreUserProfileByEmail(firestore, email, callback)
}

export function getEventTypes(firestore) {
  getFirestoreEventTypes(firestore)
}

export function getSpaces(firestore) {
  getFirestoreSpaces(firestore)
}

export function getFile(firebase, path, callback) {
  getFirestoreFile(firebase, path, callback)
}

export function getInterestGroupTypes(firestore) {
  getFirestoreInterestGroupTypes(firestore)
}

export function getInterestGroups(firestore, status) {
  getInterestGroupTypes(firestore)
  getFirestoreInterestGroups(firestore, status)
}

export function getUserInterestGroups(firestore, userID, callback = () => {}, alias = 'userInterestGroups') {
  getInterestGroupTypes(firestore)
  getFirestoreUserInterestGroups(firestore, userID, callback, alias)
}

export function createInterestGroup(firestore, firebase, interestGroup, callback) {
  if (interestGroup.logo) {
    uploadLogo(firebase, interestGroup.logo, (filePath) => {
      interestGroup = {
        ...interestGroup,
        logo: filePath,
      }

      createFirestoreInterestGroup(firestore, interestGroup, callback)
    })
  } else {
    createFirestoreInterestGroup(firestore, interestGroup, callback)
  }
}

export function updateInterestGroup(firestore, firebase, interestGroup, callback = () => {}) {
  if(interestGroup.original.logo !== interestGroup.logo) {
    if(interestGroup.original.logo) {
      deleteFirebaseFile(firebase, interestGroup.original.logo, () => {})
    }

    if(interestGroup.logo) {
      uploadLogo(firebase, interestGroup.logo, (filePath) => {
        interestGroup = {
          ...interestGroup,
          logo: filePath,
        }

        updateFirestoreInterestGroup(firestore, interestGroup, callback)
      })
    } else {
      updateFirestoreInterestGroup(firestore, interestGroup, callback)
    }
  } else {
    updateFirestoreInterestGroup(firestore, interestGroup, callback)
  }
}

export function deleteGroup(firestore, firebase, group, callback) {
  if(group.logo) {
    deleteFirebaseFile(firebase, group.logo, () => {})
  }

  deleteFirestoreGroup(firestore, group, callback)
}

export function getInterestGroup(firestore, igID, callback = () => {}) {
  getInterestGroupTypes(firestore)
  getFirestoreGroup(firestore, igID, callback, 'interestGroup')
}

export function initialiseGAPI() {
  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/api.js";
  document.body.appendChild(script);

  script.onload = () => {
    window.gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: firebaseConfig.apiKey,
        clientId: firebaseConfig.clientId,
        discoveryDocs: firebaseConfig.discoveryDocs,
        scope: firebaseConfig.scopes.join(' '),
      })
     })
   }
}

export function signIn(firebase, successCallback, errorCallback) {
  window.gapi.auth2.getAuthInstance().signIn().then((e) => {
    var idToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
    var creds = firebase.auth.GoogleAuthProvider.credential(idToken);

    firebase.auth()
    .signInAndRetrieveDataWithCredential(creds)
    .then((result) => successCallback(result))
    .catch((error) => errorCallback(error))
  })
}

export function signOut(firebase, callback) {
  var auth = gapi.auth2.getAuthInstance()

  firebase.logout().then(() => {
  	auth.signOut().then(() => {
  		callback()
  	})
  })
}

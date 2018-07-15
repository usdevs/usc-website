import {
  createGroup as createFirestoreGroup,
  updateGroup as updateFirestoreGroup,
  deleteGroup as deleteFirestoreGroup,
  getGroupTypes as getFirestoreGroupTypes,
  getInterestGroupTypes as getFirestoreInterestGroupTypes,
  getInterestGroups as getFirestoreInterestGroups,
  getUserInterestGroups as getFirestoreUserInterestGroups,
  getUserGroups as getFirestoreUserGroups,
  getGroup as getFirestoreGroup,
  getGroups as getFirestoreGroups,
  watchGroups as watchFirestoreGroups
} from '../firestore/GroupsClient'
import {
  uploadFile as uploadFirebaseFile,
  deleteFile as deleteFirebaseFile,
} from '../firestore/FilesClient'
import { config } from '../resources/config'

export function createGroup(firestore, firebase, interestGroup, callback, errorCallback = () => {}) {
  if (interestGroup.logo) {
    uploadLogo(firebase, interestGroup.logo, (filePath) => {
      interestGroup = {
        ...interestGroup,
        logo: filePath,
      }

      createFirestoreGroup(firestore, interestGroup, callback, errorCallback)
    })
  } else {
    createFirestoreGroup(firestore, interestGroup, callback, errorCallback)
  }
}

export function updateGroup(firestore, firebase, interestGroup, originalInterestGroup, callback = () => {}, errorCallback = () => {}) {
  if(originalInterestGroup.logo !== interestGroup.logo) {
    if(originalInterestGroup.logo) {
      deleteFirebaseFile(firebase, originalInterestGroup.logo, () => {})
    }

    if(interestGroup.logo) {
      uploadLogo(firebase, interestGroup.logo, (filePath) => {
        interestGroup = {
          ...interestGroup,
          logo: filePath,
        }

        updateFirestoreGroup(firestore, interestGroup, callback, errorCallback)
      })
    } else {
      updateFirestoreGroup(firestore, interestGroup, callback, errorCallback)
    }
  } else {
    updateFirestoreGroup(firestore, interestGroup, callback, errorCallback)
  }
}

export function deleteGroup(firestore, firebase, group, callback) {
  if(group.logo) {
    deleteFirebaseFile(firebase, group.logo, () => {})
  }

  deleteFirestoreGroup(firestore, group, callback)
}

//Read

export function getInterestGroups(firestore, status) {
  getInterestGroupTypes(firestore)
  getFirestoreInterestGroups(firestore, status)
  watchFirestoreGroups(firestore)
}

export function getUserInterestGroups(firestore, userID, callback = () => {}, alias = 'userInterestGroups') {
  getInterestGroupTypes(firestore)
  getFirestoreUserInterestGroups(firestore, userID, callback, alias)
  watchFirestoreGroups(firestore)
}

export function getInterestGroup(firestore, igID, callback = () => {}) {
  getInterestGroupTypes(firestore)
  getFirestoreGroup(firestore, igID, callback, 'interestGroup')
  watchFirestoreGroups(firestore)
}

export function getGroup(firestore, groupID, callback = () => {}) {
  getFirestoreGroupTypes(firestore, ()=>{})
  getFirestoreGroup(firestore, groupID, callback)
  watchFirestoreGroups(firestore)
}

export function getGroupTypes(firestore, callback = () => {}) {
  getFirestoreGroupTypes(firestore, callback)
}

export function getUserGroups(firestore, userID, callback = () => {}, alias = 'userGroups') {
  getGroupTypes(firestore)
  getFirestoreUserGroups(firestore, userID, callback, alias)
}

export function getGroups(firestore, callback = () => {}) {
  getGroupTypes(firestore, callback)
  getFirestoreGroups(firestore, callback)
  watchFirestoreGroups(firestore)
}

export function getGroupsExceptIG(firestore, callback = () => {}) {
  getGroupTypes(firestore, callback)
  getFirestoreGroups(firestore, callback, true)
  watchFirestoreGroups(firestore)
}

export function getInterestGroupTypes(firestore) {
  getFirestoreInterestGroupTypes(firestore)
}

//Utility

export function uploadLogo(firebase, logo, callback) {
  uploadFirebaseFile(firebase, config.logoFilePath, logo, callback)
}

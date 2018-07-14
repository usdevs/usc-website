import {
  getModuleTypes as getFirestoreModuleTypes,
  getModules as getFirestoreModules,
  getModule as getFirestoreModule,
  getModuleReview as getFirestoreModuleReview,
  getModuleReviews as getFirestoreModuleReviews,
  getUserModuleReviews as getFirestoreUserModuleReviews,
  addModule as addFirestoreModule,
  addReview as addFirestoreReview,
  updateReview as updateFirestoreReview,
  deleteReview as deleteFirestoreReview,
} from '../firestore/ModulesClient'

//Create Update and Delete

export function addModule(firestore, module, callback = () => {}, errorCallback = () => {}) {
  addFirestoreModule(firestore, module, callback, errorCallback)
}

export function addReview(firestore, review, callback = () => {}, errorCallback = () => {}) {
  addFirestoreReview(firestore, review, callback, errorCallback)
}

export function updateReview(firestore, review, callback = () => {}) {
  updateFirestoreReview(firestore, review, callback)
}

export function deleteReview(firestore, review, callback = () => {}) {
  deleteFirestoreReview(firestore, review, callback)
}

//Read

export function getModuleTypes(firestore, uspOnly = false, callback = () => {}) {
  getFirestoreModuleTypes(firestore, uspOnly, callback)
}

export function getModules(firestore, uspOnly = false, callback = () => {}) {
  getModuleTypes(firestore, uspOnly)
  getFirestoreModules(firestore, null, callback)
}

export function getModule(firestore, moduleID, callback = () => {}) {
  getModuleTypes(firestore)
  getFirestoreModule(firestore, moduleID, callback)
}

export function getModuleReview(firestore, moduleReviewID, callback = () => {}) {
  getFirestoreModuleReview(firestore, moduleReviewID, callback )
}

export function getModuleReviews(firestore, moduleID = null, callback = () => {}) {
  getFirestoreModuleReviews(firestore, moduleID, callback )
}

export function getUserModuleReviews(firestore, userID, callback = () => {}) {
  getFirestoreUserModuleReviews(firestore, userID, callback)
}

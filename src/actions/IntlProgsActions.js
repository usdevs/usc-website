import {
  createIntlProg as createFirestoreIntlProg,
  getIntlProg as getFirestoreIntlProg,
  getIntlProgs as getFirestoreIntlProgs,
  submitIntlProgReview as submitFirestoreIntlProgReview,
  getIntlProgReviews as getFirestoreIntlProgReviews,
} from '../firestore/IntlProgsClient'
import { uploadFile, uploadFiles } from './FilesActions'
import { config } from '../resources/config'

export function createIntlProg(firestore, firebase, intlProg, callback = () => {}) {
  const createProg = (intlProg) => {
    uploadFile(firebase, config.intlProgsFilePath, intlProg.displayImg, (displayImgPath) => {
      uploadFile(firebase, config.intlProgsFilePath, intlProg.flag, (flagPath) => {
        createFirestoreIntlProg(firestore, {
          ...intlProg,
          displayImg: displayImgPath,
          flag: flagPath
        }, (snapshot) => {
          callback(snapshot)
        })
      })
    })
  }

  if (intlProg.additionalImg && intlProg.additionalImg != '') {
    uploadFiles(firebase, config.intlProgsFilePath, intlProg.additionalImg, (filePaths) => {
      createProg({
        ...intlProg,
        additionalImg: filePaths
      })
    })
  } else { createProg(intlProg) }
}

export function getIntlProg(firestore, intlProgID, callback = () => {}) {
  getFirestoreIntlProg(firestore, intlProgID, callback)
}

export function getIntlProgs(firestore, callback = () => {}) {
  getFirestoreIntlProgs(firestore, callback)
}

export function submitIntlProgReview(firestore, review, callback = () => {}) {
  submitFirestoreIntlProgReview(firestore, review, callback)
}

export function getIntlProgReviews(firestore, intlProgID, callback = () => {}) {
  getFirestoreIntlProgReviews(firestore, intlProgID, callback)
}

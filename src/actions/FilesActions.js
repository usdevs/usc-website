import {
  getFile as getFirestoreFile,
  uploadFile as uploadFirebaseFile,
  uploadFiles as uploadFirebaseFiles,
  deleteFile as deleteFirebaseFile,
} from '../firestore/FilesClient'

const imageCache = {}

export function getFile(firebase, path, callback) {

  if(!imageCache.path) {
    getFirestoreFile(firebase, path, (url) => {
      imageCache[path] = url
      
      callback(url)
    })
  } else {
    callback(imageCache.path)
  }

}

export function uploadFile(firebase, path, file, callback = () => {}) {
  uploadFirebaseFile(firebase, path, file, callback)
}

export function uploadFiles(firebase, path, files, callback = () => {}) {
  uploadFirebaseFiles(firebase, path, files, callback)
}

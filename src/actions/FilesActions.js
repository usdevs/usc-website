import {
  getFile as getFirestoreFile,
  uploadFile as uploadFirebaseFile,
  deleteFile as deleteFirebaseFile,
} from '../firestore/FilesClient'

export function getFile(firebase, path, callback) {
  getFirestoreFile(firebase, path, callback)
}

export function uploadFile(firebase, path, file, metadataPath, callback) {
  uploadFirebaseFile(firebase, path, file, metadataPath, callback)
}

import {
  getFile as getFirestoreFile
} from '../firestore/FilesClient'

export function getFile(firebase, path, callback) {
  getFirestoreFile(firebase, path, callback)
}

import ImageCompressor from 'image-compressor.js';
import { newUUID } from '../utils/utils'
import axios from 'axios'

export function getFile(firebase, path, callback) {
  firebase
  .storage()
  .ref(path)
  .getDownloadURL()
  .then((url) => callback(url))
}

export function uploadFile(firebase, filePath, file, callback) {
  axios({
        method: 'get',
        url: file, // blob url eg. blob:http://127.0.0.1:8000/e89c5d87-a634-4540-974c-30dc476825cc
        responseType: 'blob'
    }).then(function(response){
      (new ImageCompressor()).compress(response.data, {
        quality: .6,
        convertSize: 1000000})
        .then((result) => {
          firebase
          .uploadFile(filePath, result, null, { name: newUUID() })
          .then((snapshot) => {
            callback(snapshot.uploadTaskSnaphot.metadata.fullPath)
          })
        })
        .catch((err) => {
          console.log(err);
        })
    })

}

export function deleteFile(firebase, path, callback) {
  firebase
  .storage()
  .ref(path)
  .delete()
  .then(() => callback())
}

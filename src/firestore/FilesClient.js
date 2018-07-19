import ImageCompressor from 'image-compressor.js';
import { newUUID } from '../utils/utils'
import axios from 'axios'
import _ from 'lodash'

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
            window.URL.revokeObjectURL(file)
            callback(snapshot.uploadTaskSnaphot.metadata.fullPath)
          })
        })
        .catch((err) => {
          console.log(err);
        })
    })
}

export function uploadFiles(firebase, filePath, files, callback) {

  var fileBlobs = []

  _.forEach(files, (file) => axios({
        method: 'get',
        url: file, // blob url eg. blob:http://127.0.0.1:8000/e89c5d87-a634-4540-974c-30dc476825cc
        responseType: 'blob'
    }).then(function(response){
      (new ImageCompressor()).compress(response.data, {
        quality: .6,
        convertSize: 1000000})
        .then((result) => {
          var newResult = result
          newResult.name = newUUID()
          fileBlobs.push(newResult)
          window.URL.revokeObjectURL(file)

          if (fileBlobs.length === files.length) {
            firebase
            .uploadFiles(filePath, fileBlobs, null)
            .then((snapshot) => {
              callback(_.map(snapshot, _.property('uploadTaskSnapshot.metadata.fullPath')))
            })
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }))

}

export function deleteFile(firebase, path, callback) {
  firebase
  .storage()
  .ref(path)
  .delete()
  .then(() => callback())
}

import ImageCompressor from 'image-compressor.js';

export function getFile(firebase, path, callback) {
  firebase
  .storage()
  .ref(path)
  .getDownloadURL()
  .then((url) => callback(url))
}

export function uploadFile(firebase, filePath, file, callback) {
  (new ImageCompressor()).compress(file, {
    quality: .6,
    convertSize: 1000000})
    .then((result) => {
      firebase
      .uploadFile(filePath, result)
      .then((snapshot) => {
        callback(snapshot.uploadTaskSnaphot.metadata.fullPath)
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

export function deleteFile(firebase, path, callback) {
  firebase
  .storage()
  .ref(path)
  .delete()
  .then(() => callback())
}

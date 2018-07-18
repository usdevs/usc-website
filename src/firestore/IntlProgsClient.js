export function createIntlProg(firestore, intlProg, callback) {
  firestore
  .add({ collection: 'intlProgs' }, intlProg)
  .then((snapshot) => callback(snapshot))
  .catch((err) => errorCallback(err))
}

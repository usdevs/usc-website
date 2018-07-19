import { config } from '../resources/config'

export function createIntlProg(firestore, intlProg, callback, errorCallback = () => {}) {
  firestore
  .add({ collection: 'intlProgs' }, intlProg)
  .then((snapshot) => callback(snapshot))
  .catch((err) => errorCallback(err))
}

export function getIntlProg(firestore, intlProgID, callback) {
  firestore
  .get({
    collection: 'intlProgs',
    doc: intlProgID
  })
  .then((snapshot) => callback(snapshot))
}

export function getIntlProgs(firestore, callback) {
  const query = {
    collection: 'intlProgs',
    orderBy: ['name']
  }

  firestore
  .get(query)
  .then((snapshot) => callback(snapshot))

  firestore
  .onSnapshot(query)
}

export function submitIntlProgReview(firestore, review, callback, errorCallback = () => {}) {
  firestore
  .add({ collection: 'intlProgReviews' }, review)
  .then((snapshot) => callback(snapshot))
  .catch((err) => errorCallback(err))
}

export function getIntlProgReviews(firestore, intlProgID, callback) {
  firestore
  .get({
    collection: 'intlProgReviews',
    where: ['intlProg', '==', intlProgID]
  })
  .then((snapshot) => callback(snapshot))
}

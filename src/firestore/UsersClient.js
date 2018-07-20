import _ from 'lodash'

export function getUserProfile(firestore, userID, callback = () => {}, alias = 'userProfile') {
  const query = {
    collection: 'users',
    doc: userID,
    storeAs: alias
  }

  firestore
  .get(query)
  .then((snapshot) => callback(snapshot))

  firestore
  .onSnapshot(query)
}

export function getUserProfileByEmail(firestore, email, callback, alias = 'userProfile') {
  firestore
  .get({
    collection: 'users',
    where: [
      ['email', '==', email]
    ],
    storeAs: alias})
  .then((snapshot) => callback(snapshot))
}

export function getUserType(firestore, typeID, callback = () => {}, alias = 'myUserType') {
  firestore
  .get({
    collection: 'userTypes',
    doc: typeID,
    storeAs: alias})
  .then((snapshot) => callback(snapshot))
}

export function getUserTypes(firestore, callback) {
  firestore
  .get({
    collection: 'userTypes'
  })
  .then((snapshot) => callback(snapshot))
}

export function formatFirestoreProfile(profile) {
  return _.pickBy(profile, _.identity)
}

export function saveProfile(firestore, profile, callback) {
  firestore
  .set({ collection: 'users', doc: profile.id }, formatFirestoreProfile(profile))
  .then((snapshot) => callback(snapshot))
}

export function watchProfile(firestore, profile, alias) {
  firestore.onSnapshot({ collection: 'users', doc: profile.id, storeAs: alias })
}

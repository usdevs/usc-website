import _ from 'lodash'
import { config } from '../resources/config'

export function formatFirestoreGroup(group, type) {
  switch (type) {
    case 'interestGroup':
      if(group.chat && group.chat !== '' && !(group.chat.startsWith("http://") || group.chat.startsWith("https://"))) {
        group = {
          ...group,
          chat: "https://" + group.chat
        }
      }

      return _.pickBy(group, _.identity)
    default:
      break
  }
}

export function createGroup(firestore, interestGroup, callback, errorCallback) {
  const group = formatFirestoreGroup(interestGroup, 'interestGroup')
  firestore
  .add({ collection: 'groups' }, group)
  .then((snapshot) => callback(group))
  .catch((err) => errorCallback(err))
}

export function updateGroup(firestore, interestGroup, callback, errorCallback) {
  const group = formatFirestoreGroup(interestGroup, 'interestGroup')
  
  firestore
  .set({ collection: 'groups' , doc: interestGroup.id }, group)
  .then((snapshot) => callback(group))
  .catch((err) => errorCallback(err))
}

export function deleteGroup(firestore, group, callback) {
  firestore
  .delete({ collection: 'groups', doc: group.id })
  .then(() => callback())
}

export function getGroup(firestore, groupID, callback, alias = 'group') {
  firestore
  .get({
    collection: 'groups',
    doc: groupID,
    storeAs: alias
  })
  .then((snapshot) => callback(snapshot))
}

export function getGroups(firestore, callback = () => {}, exceptIG = false) {
  var query = {
    collection: 'groups',
    orderBy: ['name']
  }

  if(exceptIG) {
    query = {
      ...query,
      where: ['category', '!=', config.categoryIDs.ig]
    }
  }

  firestore
  .get(query)
  .then((snapshot) => callback(snapshot))
}

export function watchGroups(firestore) {
  firestore.setListeners([
    { collection: 'groups' },
  ])
}

export function getGroupTypes(firestore, callback = () => {}) {
  firestore
  .get({
    collection: 'groupTypes',
    orderBy: ['name']
  })
  .then((snapshot) => callback(snapshot))
}

export function getInterestGroupTypes(firestore, callback = () => {}) {
  firestore
  .get({
    collection: 'groupTypes',
    orderBy: ['name'],
    where: ['category', '==', config.categoryIDs.ig],
    storeAs: 'igTypes'
  })
  .then((snapshot) => callback(snapshot))
}

export function getInterestGroups(firestore, status) {
    if(status) {
      firestore
      .get({
        collection: 'groups',
        orderBy: ['name'],
        where: [
          ['category', '==', config.categoryIDs.ig],
          ['status', '==', status],
        ],
        storeAs: 'interestGroups'
      })
    } else {
      firestore
      .get({
        collection: 'groups',
        orderBy: ['name'],
        where: ['category', '==', config.categoryIDs.ig],
        storeAs: 'interestGroups'
      })
    }
}

export function getUserGroups(firestore, userID, callback, alias, exceptIG = false) {
  //const whereField = 'members.' + userID
  var query = {
    collection: 'groups',
    where: [
      ['leaderID', '==', userID]
    ],
    storeAs: alias
  }

  firestore
  .get(query)
  .then((snapshot) => callback(snapshot))

  firestore
  .onSnapshot(query)
}

export function getUserInterestGroups(firestore, userID, callback, alias) {
  //const whereField = 'members.' + userID
  const query = {
    collection: 'groups',
    where: [
      ['leaderID', '==', userID]
    ],
    storeAs: alias
  }
  firestore
  .get(query)
  .then((snapshot) => callback(snapshot))

  firestore
  .onSnapshot(query)
}

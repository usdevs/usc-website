import _ from 'lodash'
import { config } from '../resources/config'

export function formatFirestoreGroup(group, type) {
  switch (type) {
    case 'interestGroup':
      var members = {}

      _.forEach(group.members, (member) => {
        members = {
          ...members,
          [member.id]: true,
        }
      })

      var interestGroup = {
        status: group.status,
        name: group.name,
        type: group.type,
        category: group.category,
        description: group.description,
        activities: group.activities,
        support: group.support,
        chat: group.chat,
        logo: group.logo,
        leaderID: group.members[0].id,
        members: members,
      }

      if(group.chat && group.chat !== '' && !(group.chat.startsWith("http://") || group.chat.startsWith("https://"))) {
        interestGroup = {
          ...interestGroup,
          chat: "https://" + group.chat
        }
      }

      return interestGroup
    default:
      break
  }
}

export function createInterestGroup(firestore, interestGroup, callback, errorCallback) {
  const group = formatFirestoreGroup(interestGroup, 'interestGroup')
  firestore
  .add({ collection: 'groups' }, group)
  .then((snapshot) => callback(group))
  .catch((err) => errorCallback(err))
}

export function updateInterestGroup(firestore, interestGroup, callback, errorCallback) {
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

export function getGroups(firestore, callback = () => {}) {
  firestore
  .get({
    collection: 'groups',
    orderBy: ['name']
  })
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

export function getUserInterestGroups(firestore, userID, callback, alias) {
  const whereField = 'members.' + userID
  firestore
  .get({
    collection: 'groups',
    where: [
      [whereField, '==', true]
    ],
    storeAs: alias
  })
}

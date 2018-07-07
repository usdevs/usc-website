import ImageCompressor from 'image-compressor.js';
import _ from 'lodash'
import { config } from '../resources/config'

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

export function formatFirestoreEvent(event, uid, googleEventID) {
  if(event.regLink && event.regLink !== '' && !(event.regLink.startsWith("http://") || event.regLink.startsWith("https://"))) {
    event = {
      ...event,
      regLink: "http://" + event.regLink
    }
  }

  if(googleEventID) {
    event = {
      ...event,
      gCalID: googleEventID
    }
  }

  return {
    name: event.name,
    type: event.type,
    internal: event.internal,
    spaceOnly: event.spaceOnly,
    venue: event.otherVenueSelected ? event.otherVenue : event.venue,
    otherVenueSelected: event.otherVenueSelected,
    otherVenue: null,
    multiDay: event.multiDay,
    fullDay: event.fullDay,
    startDate: event.startDate.toDate(),
    endDate: event.endDate.toDate(),
    poster: event.poster,
    description: event.description,
    regLink: event.regLink,
    organisedBy: event.organisedBy ? event.organisedBy.id : null,
    creator: uid,
    original: null,
  }
}

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

export function createEvent(firestore, event, uid, googleEventID, callback, errorCallback) {
  firestore
  .add({ collection: 'events' }, formatFirestoreEvent(event, uid, googleEventID))
  .then(() => callback())
  .catch((err) => errorCallback(err))
}

export function updateEvent(firestore, event, uid, callback, errorCallback) {
  const newEvent = formatFirestoreEvent(event, uid)
  firestore
  .set({ collection: 'events', doc: event.id }, newEvent)
  .then(() => callback(newEvent))
  .catch((err) => errorCallback(err))
}

export function deleteEvent(firestore, event, callback) {
  firestore
  .delete({ collection: 'events', doc: event.id })
  .then(() => callback())
}

export function getEvents(firestore, callback = () => {}, month = null, spaceOnly = false, startInMonth = true) {
  var query = { collection: 'events', orderBy: ['startDate'] }
  var where = []

  if (month) {
    const dateField = startInMonth ? 'startDate' : 'endDate'
    where.push([dateField, '>=', month.clone().startOf('month').add(-1, 'month').toDate()])
    where.push([dateField, '<=', month.clone().endOf('month').add(1, 'month').toDate()])

    const nameField = startInMonth ? 'eventsStartInMth' : 'eventsEndInMth'
    query = {
      ...query,
      storeAs: nameField,
      orderBy: [dateField]
    }
  }

  if (spaceOnly) {
    where.push(['otherVenueSelected', '==', false])
  }

  if (where.length > 0) {
    query = {
      ...query,
      where: where
    }
  }

  firestore
  .get(query)
  .then(() => callback())
}

export function getGroupEvents(firestore, groupID, callback = () => {}) {
  firestore
  .get({
    collection: 'events',
    where: ['organisedBy', '==', groupID],
    orderBy: ['startDate'],
    storeAs: 'groupEvents'
  })
  .then((snapshot) => console.log(snapshot))
}

export function getEventsAfter(firestore, callback, alias, date, limit) {
  firestore
  .get({
    collection: 'events',
    where: [
      ['endDate', '>=', date.toDate()]
    ],
    orderBy: ['endDate'],
    storeAs: alias,
    limit: limit})
}

export function getEvent(firestore, eventID) {
  firestore
  .get({
    collection: 'events',
    doc: eventID,
    storeAs: 'event'})
}

export function getUserEvents(firestore, userID, callback) {
  firestore
  .get({
    collection: 'events',
    where: [
      ['creator', '==', userID]
    ],
    orderBy: ['startDate'],
    storeAs: 'userEvents'})
  .then((snapshot) => callback(snapshot))
}

export function watchEvents(firestore) {
  firestore.setListeners([
    { collection: 'events' },
  ])
}

export function getUserProfile(firestore, userID, callback = () => {}, alias = 'userProfile') {
  firestore
  .get({
    collection: 'users',
    doc: userID,
    storeAs: alias})
  .then((snapshot) => callback(snapshot))
}

export function getUserProfileByEmail(firestore, email, callback, alias = 'userProfiles') {
  firestore
  .get({
    collection: 'users',
    where: [
      ['email', '==', email]
    ],
    storeAs: alias})
  .then((snapshot) => callback(snapshot))
}

export function getEventTypes(firestore) {
  firestore
  .get({ collection: 'eventTypes', orderBy: ['name'] })
}

export function getSpaces(firestore) {
  firestore
  .get({ collection: 'spaces', orderBy: ['name'] })
}

export function getFile(firebase, path, callback) {
  firebase
  .storage()
  .ref(path)
  .getDownloadURL()
  .then((url) => callback(url))
}

export function getGroupTypes(firestore, callback = () => {}) {
  firestore
  .get({
    collection: 'groupTypes',
    orderBy: ['name']
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

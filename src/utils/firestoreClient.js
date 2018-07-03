import ImageCompressor from 'image-compressor.js';

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
      console.log(err.message);
    })
}

export function deleteFile(firebase, filesPath, file, key) {
  return firebase.deleteFile(file.fullPath, `${filesPath}/${key}`)
}

export function createEvent(firestore, event, uid, googleEventID, callback) {
  if(event.regLink && !(event.regLink.startsWith("http://") || event.regLink.startsWith("https://"))) {
    event = {
      ...event,
      regLink: "http://" + event.regLink
    }
  }

  firestore
  .add({ collection: 'events' }, {
    name: event.name,
    type: event.type,
    tentative: event.tentative,
    spaceOnly: event.spaceOnly,
    venue: event.otherVenueSelected ? event.otherVenue : event.venue,
    otherVenueSelected: event.otherVenueSelected,
    multiDay: event.multiDay,
    fullDay: event.fullDay,
    startDate: event.startDate.toDate(),
    endDate: event.endDate.toDate(),
    poster: event.poster,
    description: event.desc,
    regLink: event.regLink,
    creator: uid,
    gCalID: googleEventID,
  })
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

  /*if (spaceOnly) {
    where.push(['otherVenueSelected', '==', false])
  }*/

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

export function getEventsAfter(firestore, callback, alias, date, limit) {
  firestore
  .get({
    collection: 'events',
    where: [
      ['startDate', '>=', date.toDate()]
    ],
    orderBy: ['startDate'],
    storeAs: alias,
    limit: limit})
}

export function watchEvents(firestore) {
  firestore.setListeners([
    { collection: 'events' },
  ])
}

export function getEventTypes(firestore) {
  firestore
  .get({ collection: 'eventTypes', orderBy: ['name'] })
}
export function getSpaces(firestore) {
  firestore
  .get({ collection: 'spaces', orderBy: ['name'] })
}

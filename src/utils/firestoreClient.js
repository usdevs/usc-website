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

export function getEventVenueBookingsAfter(firestore, venueID, date, alias, callback) {
  firestore
  .get({
    collection: 'events',
    where: [
      ['endDate', '>=', date.toDate()],
      ['venue', '==', venueID]
    ],
    orderBy: ['endDate'],
    storeAs: alias})
  .then((snapshot) => callback(snapshot))
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

export function watchGroups(firestore) {
  firestore.setListeners([
    { collection: 'groups' },
  ])
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


export function getModuleTypes(firestore, uspOnly, callback) {
  var query = {
    collection: 'moduleTypes',
    orderBy: ['name']
  }

  if (uspOnly) {
    query = {
      ...query,
      where: ['isUSP', '==', true]
    }
  }

  firestore
  .get(query)
  .then((snapshot) => callback(snapshot))
}

export function getModule(firestore, moduleID, callback, alias = 'module') {
  firestore
  .get({
    collection: 'modules',
    doc: moduleID,
    storeAs: alias
  })
  .then((snapshot) => callback(snapshot))
}

export function getModuleReviews(firestore, moduleID, callback) {
  var query = {
    collection: 'moduleReviews',
    orderBy: ['semester', 'desc']
  }

  if(moduleID) {
    query = {
      ...query,
      where: ['module', '==', moduleID],
    }
  }

  firestore
  .get(query)
  .then((snapshot) => callback(snapshot))
}

export function getModules(firestore, type, callback = () => {}) {
  var query = {
    collection: 'modules',
    orderBy: ['name']
  }

  if (type) {
    query = {
      ...query,
      where: ['type', '==', type]
    }
  }

  firestore
  .get(query)
  .then((snapshot) => callback(snapshot))
}

export function formatNUSModsModule(module) {
  const departments = {
    "Arts & Social Sciences": ["Centre For Language Studies","Chinese Studies","Communications And New Media","Dean's Office (Arts & Social Sc.)","Economics","English Language & Literature","Geography","History","Japanese Studies","Malay Studies","Philosophy","Political Science","Psychology","Social Work","Sociology","South Asian Studies Programme","Southeast Asian Studies"],"Dentistry":["Dentistry","Division Of Graduate Dental Studies"],
    "Duke-NUS Medical School":["Duke-NUS Medical School"],
    "Engineering":["Bachelor Of Technology Programme","Biomedical Engineering","Chemical & Biomolecular Engineering","Civil & Environmental Engineering","Dean's Office (Engineering)","Division Of Engineering And Tech Mgt","Electrical & Computer Engineering","Engineering Science Programme","Industrial & Systems Engineering","Materials Science And Engineering","Mechanical Engineering"],
    "Joint Multi-Disciplinary Programmes":["Computing & Engineering"],
    "Law":["Law"],
    "Lee Kuan Yew School Of Public Policy":["Lee Kuan Yew School Of Public Policy"],
    "NUS Enterprise":["NUS Entrepreneurship Centre"],
    "NUS Grad Sch For Integrative Sci & Engg":["NUS Grad Sch For Integrative Sci & Engg"],
    "Non-Faculty-Based Departments":["College Of Alice & Peter Tan","Ctr For English Language Communication","Institute Of Systems Science","Residential College 4","Ridge View Residential College","Temasek Defence Systems Institute","Tembusu College"],
    "Saw Swee Hock School Of Public Health":["Saw Swee Hock School Of Public Health"],
    "School Of Business":["Accounting","Dean's Office (Biz)","Decision Sciences","Finance","Human Resource Management Unit","Management And Organisation","Marketing","Strategy And Policy"],
    "School Of Computing":["Computer Science","Dean's Office (School Of Computing)","Information Systems"],
    "School Of Design And Environment":["Architecture","Building","Dean's Office (School Of Design & Env)","Division Of Industrial Design","Real Estate"],
    "Science":["Biological Sciences","Chemistry","Dean's Office (Science)","Mathematics","Pharmacy","Physics","Statistics & Applied Probability"],
    "Speciality Research Institutes/Centres":["Centre For Quantum Technologies","Mechanobiology Institute","Risk Management Institute","The Logistics Institute - Asia Pacific"],
    "University Administration":["Centre For Future-Ready Graduates","Registrar's Office"],
    "University Scholars Programme":["University Scholars Programme"],
    "Yale-NUS College":["Yale-NUS College"],
    "Yong Loo Lin School Of Medicine":["Anatomy","Biochemistry","Dean's Office (Medicine)","Division Of Graduate Medical Studies","Microbiology & Immunology","Nursing/Alice Lee Ctr For Nursing Stud","Pathology","Pharmacology","Physiology"],
    "Yong Siew Toh Conservatory Of Music":["Yong Siew Toh Conservatory Of Music"]}

  const departmentIDMapping = {
    "Arts & Social Sciences": "NNYLff178HnAXKUDZnpD",
    "Engineering": "zEAgcibhuEJwcyshdenK",
    "School Of Design And Environment": "ALO6JzGjSFwo6mLOVpte",
    "School Of Computing": "KQhvOcG1MNrtH3Idvum2",
    "Law": "Y6idRDuzNmjY5VkoPhsF",
    "Science": "bYP3Y2GHD16NNc1pCOv0",
    "School Of Business": "pQe6KlrujUr4LrrwlrR3",
    "University Scholars Programme": "vXT67zuF2DBLHpwu8MOM"
  }

  var department = null
  _.forOwn(departments, (value, key) => {
    if (_.indexOf(value, module.Department) >= 0) {
      department = key
    }
  })

  var type = department ? departmentIDMapping[department] : null
  var name = module.ModuleTitle

  if(module.ModuleCode.startsWith("UWC") || module.ModuleCode.startsWith("UQF") || module.ModuleCode.startsWith("USS")) {
    type = "5Ac0UEQRf2RwuZOOiP3d"
    const subName = _.split(name, ': ', 2)[1]
    name = subName ? subName : name
  } else if(module.ModuleCode.startsWith("USR")) {
    type = "Dgpuub6ek5271K5qckq6"
  }

  return {
    code: module.ModuleCode,
    name: name,
    description: module.ModuleDescription ? module.ModuleDescription : '',
    type: type
  }
}

export function addModule(firestore, module, callback, errorCallback) {
  const mod = formatNUSModsModule(module)

  if(mod.type) {
    console.log(mod)
    firestore
    .set({ collection: 'modules', doc: mod.code }, mod)
    .then((snapshot) => callback(snapshot))
    .catch((err) => errorCallback(err))
  }
}

export function addReview(firestore, review, callback, errorCallback) {
  firestore
  .add({ collection: 'moduleReviews' }, review)
  .then((snapshot) => callback(snapshot))
  .catch((err) => errorCallback(err))
}

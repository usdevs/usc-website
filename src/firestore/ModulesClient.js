import _ from 'lodash'

export function addModule(firestore, module, callback, errorCallback) {
  const mod = formatNUSModsModule(module)

  if(mod.type) {
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

export function updateReview(firestore, review, callback, errorCallback) {
  firestore
  .set({ collection: 'moduleReviews', doc: review.id }, review)
  .then((snapshot) => callback(snapshot))
  .catch((err) => errorCallback(err))
}

export function deleteReview(firestore, review, callback) {
  firestore
  .delete({ collection: 'moduleReviews', doc: review.id })
  .then(() => callback())
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

export function getModuleReview(firestore, moduleReviewID, callback, alias = 'moduleReview') {
  firestore
  .get({
    collection: 'moduleReviews',
    doc: moduleReviewID,
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

export function getUserModuleReviews(firestore, userID, callback) {
  const query = {
    collection: 'moduleReviews',
    where: ['creator', '==', userID],
    orderBy: ['semester', 'desc'],
    storeAs: 'userReviews'
  }

  firestore
  .get(query)
  .then((snapshot) => callback(snapshot))

  firestore
  .onSnapshot(query)
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

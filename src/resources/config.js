export const config = {
  timeInterval: 30,
  posterFilePath: 'poster',
  logoFilePath: 'logo',
  avatarFilePath: 'avatar',
  intlProgsFilePath: 'intlProgs',
  minimumIGMembers: 1,
  descriptionPreviewLength: 200,
  reviewStartYear: -4,
  categoryIDs: {
    ig: '0ee1DDaz3D9ZdsZTk29p',
    gui: 'COOcvdATPUEwJt6B9VIb',
    usc: 'L8L3JXqiUI2OUbIDMhUe',
    others: 'X7zfHxrdj4cZSj49yV5y'
  },
  igStatuses: {
    active: 'active',
    pending: 'pending'
  }
}

export const groupStatuses = {
  active: { id: 'active', name: 'Active', colour: 'success' },
  pending: { id: 'pending', name: 'Pending', colour: 'info' },
  inactive: { id: 'inactive', name: 'Inactive', colour: 'danger' }
}

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'usc-website-206715.firebaseapp.com',
  databaseURL: 'https://usc-website-206715.firebaseio.com',
  projectId: 'usc-website-206715',
  storageBucket: 'usc-website-206715.appspot.com',
  messagingSenderId: '115895791273',
  clientId:
    '115895791273-6hbrflf3p4hq9o9b1td3lijq602eb3jk.apps.googleusercontent.com',
  scopes: [
    'email', 
    'profile'
    // Bad hotfix: calendar scope blocks login becuase the app is flagged as accessing sensitive information
    // 'https://www.googleapis.com/auth/calendar'
  ],
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  ]
}

export const apiGoogleconfig = {
  clientId:
    '337213253828-snl8g30p78ufkd79em1ee8ujk7a7bh32.apps.googleusercontent.com',
  apiKey: process.env.REACT_APP_GCAL_API_KEY,
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  ]
}

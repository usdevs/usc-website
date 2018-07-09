export const config = {
  timeInterval: 30,
  posterFilePath: 'poster',
  logoFilePath: 'logo',
  avatarFilePath: 'avatar',
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

export const statusColor = {
  "active": 'success',
  "pending": 'info',
  "inactive": 'danger',
}

export const firebaseConfig = {
    apiKey: "***REMOVED***",
    authDomain: "usc-website-206715.firebaseapp.com",
    databaseURL: "https://usc-website-206715.firebaseio.com",
    projectId: "usc-website-206715",
    storageBucket: "usc-website-206715.appspot.com",
    messagingSenderId: "115895791273",
    clientId: "115895791273-6hbrflf3p4hq9o9b1td3lijq602eb3jk.apps.googleusercontent.com",
    scopes: [
             "email",
             "profile",
             "https://www.googleapis.com/auth/calendar"
    ],
    discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
  };

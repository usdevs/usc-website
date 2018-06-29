import { combineReducers } from 'redux'
import { mcMembers as mcMembersData, uscCommittees as uscCommitteesData, houseCommittees as houseCommitteesData } from './resources/data'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

function mcMembers(state = [], action) {
  return mcMembersData
}

function uscCommittees(state = [], action) {
  return uscCommitteesData
}

function houseCommittees(state = [], action) {
  return houseCommitteesData
}

export default combineReducers({
  mcMembers,
  uscCommittees,
  houseCommittees,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

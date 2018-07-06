import { combineReducers } from 'redux'
import { mcMembers as mcMembersData, uscCommittees as uscCommitteesData, houseCommittees as houseCommitteesData } from './resources/data'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import { CACHE_IMAGEURL } from './actions'

function imageCache(state = {}, action) {
  if(action.type === CACHE_IMAGEURL) {
    return {
      ...state,
      [action.payload.path]: action.payload.url
    }
  } else {
    return state
  }
}

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
  imageCache,
  mcMembers,
  uscCommittees,
  houseCommittees,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

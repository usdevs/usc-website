import { combineReducers } from 'redux'
import { mcMembers as mcMembersData, uscCommittees as uscCommitteesData, houseCommittees  as houseCommitteesData } from './resources/data'

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
  houseCommittees
})

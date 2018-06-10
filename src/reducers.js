import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'
import { mcMembers as mcMembersData, uscCommittees as uscCommitteesData, houseCommittees  as houseCommitteesData } from './resources/data'

const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
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
  mcMembers,
  uscCommittees,
  houseCommittees
})

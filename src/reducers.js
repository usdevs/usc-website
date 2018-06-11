import { combineReducers } from 'redux'
import { mcMembers as mcMembersData, uscCommittees as uscCommitteesData, houseCommittees  as houseCommitteesData, spaces as spacesData } from './resources/data'
import { SET_GOOGLE_EVENTS } from './actions'
import lodash from 'lodash'
import moment from 'moment'
import { dayFormat } from './resources/gcal'

function mcMembers(state = [], action) {
  return mcMembersData
}

function uscCommittees(state = [], action) {
  return uscCommitteesData
}

function houseCommittees(state = [], action) {
  return houseCommitteesData
}

function googleEventsByDay(state = {}, action) {
  switch (action.type){
    case SET_GOOGLE_EVENTS:
      var gEvents = {}
      action.payload.map((event) => {
        const details = lodash.split(event.location, '/', 2);
        event = {
          ...event,
          type: lodash.trim(details[0]),
          venue: details.length > 1 ? lodash.trim(details[1]) : ""
        }
        const date = moment(event.start).format(dayFormat)
        var dayEvents = gEvents[date] ? gEvents[date].slice() : [];
        dayEvents.push(event);

        gEvents = {
          ...gEvents,
          [date]: dayEvents
        }
      })

      return gEvents
    default:
      return state
  }
}

function googleEvents(state = [], action) {
  switch (action.type){
    case SET_GOOGLE_EVENTS:
      return action.payload
    default:
      return state
  }
}

function googleEventsUpcoming(state = [], action) {
  switch (action.type){
    case SET_GOOGLE_EVENTS:
      var gEvents = []
      action.payload.map((event) => {
        if (moment(event.start).isAfter(moment())) {
          gEvents.push(event)
        }
      })
      return gEvents
    default:
      return state
  }
}

function spaces(state = [], action) {
  return spacesData
}

export default combineReducers({
  mcMembers,
  uscCommittees,
  houseCommittees,
  googleEvents,
  googleEventsByDay,
  googleEventsUpcoming,
  spaces
})

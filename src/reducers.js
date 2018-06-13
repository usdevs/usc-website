import { combineReducers } from 'redux'
import { mcMembers as mcMembersData, uscCommittees as uscCommitteesData, houseCommittees  as houseCommitteesData, spaces as spacesData } from './resources/data'
import { SET_GOOGLE_EVENTS } from './actions'
import _ from 'lodash'
import moment from 'moment'
import { dayFormat } from './resources/gcal'
import { getSpaceID, defaultTypeColor, typeToColor } from './resources/data'

function mcMembers(state = [], action) {
  return mcMembersData
}

function uscCommittees(state = [], action) {
  return uscCommitteesData
}

function houseCommittees(state = [], action) {
  return houseCommitteesData
}

function createEventObject(event) {
  const details = _.split(event.location, '/', 2);
  const spaceID = details[1] ? getSpaceID(_.trim(details[1])) : -1

  const type = _.trim(details[0])
  const venue = details.length > 1 ? _.trim(details[1]) : ""
  var fullDay = event.meta.start.date ? true : false

  return ({
    ...event,
    start: !fullDay ? moment(event.start) : moment(event.start).startOf('day'),
    end: !fullDay ? moment(event.end) : moment(event.start).startOf('day').add(1, 'day'),
    type: type,
    venue: venue,
    spaceID: spaceID,
    color: typeToColor[type] ? typeToColor[type] : "black"
  })
}

function createEventDateObject(event) {
  const date = moment(event.start).format(dayFormat)

  return ({
    [date]: [createEventObject(event)]
  })
}

function mergeEvents(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return _.sortBy(objValue.concat(srcValue), [function(o) { return o.start; }]);
  }
}

function googleEvents(state = [], action) {
  switch (action.type){
    case SET_GOOGLE_EVENTS:
      var gEvents = {}
      action.payload.map((event) => {
        gEvents = _.mergeWith(gEvents, createEventObject(event), mergeEvents)
      })

      return gEvents
    default:
      return state
  }
}

function googleEventsByDay(state = {}, action) {
  switch (action.type){
    case SET_GOOGLE_EVENTS:
      var gEvents = {}

      action.payload.map((event) => {
        gEvents = _.mergeWith(gEvents, createEventDateObject(event), mergeEvents)
      })


      return gEvents
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
          gEvents.push(createEventObject(event))
        }
      })

      return gEvents
    default:
      return state
  }
}


function bookingsByDay(state = {eventCal: false, spacesCal: false, events: {}}, action) {
  switch (action.type){
    case SET_GOOGLE_EVENTS:
      if(state.eventCal === false) {
        var gEvents = {}

        action.payload.map((Event) => {
          const event = createEventObject(Event)

          if (event.spaceID !== -1) {
            gEvents = _.mergeWith(gEvents, createEventDateObject(event), mergeEvents)
          }
        })

        return {
          ...state,
          eventCal: true,
          events: _.mergeWith(state.events, gEvents, mergeEvents)
        }
      } else {
        return state
      }
    default:
      return state
  }
}

function bookingsByDayBySpace(state = {eventCal: false, spacesCal: false, events: {}}, action) {
  switch (action.type){
    case SET_GOOGLE_EVENTS:
      if(state.eventCal === false) {
        var gEvents = {}

        action.payload.map((Event) => {
          const event = createEventObject(Event)

          if (event.spaceID !== -1) {
            const eventObject = {
              [moment(event.start).format(dayFormat)]: {
                [event.venue]: [event]
              }
            }

            gEvents = _.mergeWith(gEvents, eventObject, mergeEvents)
          }
        })

        return {
          ...state,
          eventCal: true,
          events: _.mergeWith(state.events, gEvents, mergeEvents)
        }
      } else {
        return state
      }
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
  bookingsByDay,
  bookingsByDayBySpace,
  spaces
})

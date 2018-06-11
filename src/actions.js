/*
 * action types
 */
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_GOOGLE_EVENTS = 'NEW_GOOGLE_EVENTS'

/*
 * other constants
 */

export const VisibilityFilters = {
  NEW_GOOGLE_EVENTS: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function setGoogleEvents(events) {
  console.log("test")
  return { type: SET_GOOGLE_EVENTS, payload: events }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

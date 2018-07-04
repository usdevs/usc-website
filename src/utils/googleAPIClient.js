export const calendarID = "primary"
export const uscalendarID = 'ggoope87t0hgl8u9upt44vv8bs@group.calendar.google.com'

export function formatGoogleEvent(event, spaces) {
  return {
    'summary': event.name,
    'location': event.otherVenueSelected ? event.otherVenue : spaces[event.venue].name,
    'description': event.description,
    'start': {
      'dateTime': event.startDate.format(),
    },
    'end': {
      'dateTime': event.endDate.format(),
    },
    'attendees': [
      {'email': uscalendarID},
    ],
    'guestsCanModify': true,
    'guestsCanInviteOthers': false,
  }
}

export function createEvent(event, spaces, callback) {
  var request = window.gapi.client.calendar.events.insert({
    'calendarId': calendarID,
    'resource': formatGoogleEvent(event, spaces)
  });

  request.execute((event) => callback(event));
}

export function updateEvent(event, spaces, callback) {
  var request = window.gapi.client.calendar.events.update({
    'calendarId': calendarID,
    'eventId': event.gCalID,
    'resource': formatGoogleEvent(event, spaces)
  });

  request.execute((event) => callback(event));
}

export function deleteEvent(event, callback) {
  var request = window.gapi.client.calendar.events.delete({
    'calendarId': calendarID,
    'eventId': event.gCalID,
  });

  request.execute((event) => callback(event));
}

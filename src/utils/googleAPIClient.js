export const calendarID = "primary"
export const uscalendarID = 'ggoope87t0hgl8u9upt44vv8bs@group.calendar.google.com'

export function formatGoogleEvent(event) {
  return {
    'summary': event.name,
    'location': event.venueName,
    'description': event.description,
    'start': {
      'dateTime': event.startDate,
    },
    'end': {
      'dateTime': event.endDate,
    },
    'attendees': [
      {'email': uscalendarID},
    ],
    'guestsCanModify': true,
    'guestsCanInviteOthers': false,
  }
}

export function createEvent(event, callback) {
  var request = window.gapi.client.calendar.events.insert({
    'calendarId': calendarID,
    'resource': formatGoogleEvent(event)
  });

  request.execute((event) => callback(event));
}

export function updateEvent(event, callback) {
  var request = window.gapi.client.calendar.events.update({
    'calendarId': calendarID,
    'eventId': event.gCalID,
    'resource': formatGoogleEvent(event)
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

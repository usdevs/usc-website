export function createEvent(event, spaces, callback) {
    var googleEvent = {
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
      {'email': 'ggoope87t0hgl8u9upt44vv8bs@group.calendar.google.com'},
    ],
    'guestsCanModify': true,
    'guestsCanInviteOthers': false,
  };

  var request = window.gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': googleEvent
  });

  request.execute((event) => callback(event));
}

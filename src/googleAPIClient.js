export function initGoogle(firebase, config) {

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://apis.google.com/js/api.js';
    document.body.appendChild(script);
    // Once the Google API Client is loaded, you can run your code
    script.onload = function(e){
     // Initialize the Google API Client with the config object
     window.gapi.client.init({
       apiKey: config.apiKey,
       clientId: config.clientID,
       discoveryDocs: config.discoveryDocs,
       scope: config.scopes.join(' '),
     })
     // Loading is finished, so start the app
     .then(function() {
      // Make sure the Google API Client is properly signed in
      if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        firebase.auth().signOut(); // Something went wrong, sign out
      }
     })
    }
    // Add to the document
    document.getElementsByTagName('head')[0].appendChild(script);
}

export function fetchEvents()
{
  return (dispatch) =>
  {
    function start()
    {
      // 2. Initialize the JavaScript client library.
      window.gapi.client.init({
        'apiKey': 'AIzaSyA0vELTTzgWbSlZ1DkQu5JChe6u40xs75k',
        // clientId and scope are optional if auth is not required.
        'clientId': '115895791273-k2uo76tni9j4loiigs3au1ig23eujae4.apps.googleusercontent.com',
        'scope': 'profile',
      }).then(function() {
        // 3. Initialize and make the API request.
        return window.gapi.client.request({
          'path': 'https://www.googleapis.com/calendar/v3/calendars/jeremyjds@me.com/events?timeMax=2017-06-03T23:00:00Z&timeMin=2017-04-30T00:00:00Z',
        })
      }).then( (response) => {
        let events = response.result.items
        dispatch({
          type: 'FETCH_EVENTS_FULFILLED',
          payload: events
        })
      }, function(reason) {
        console.log(reason);
      });
    };

    // 1. Load the JavaScript client library.
    window.gapi.load('client', start)
}}

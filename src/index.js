/* global gapi */

import React from 'react';
import { render } from 'react-snapshot';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { compose } from 'redux';
import { Provider } from 'react-redux';
import moment from 'moment';
import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'
import firebase from 'firebase'
import './index.css';
import { initGoogle } from './googleAPIClient'
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Events from './components/Events';
import Spaces from './components/Spaces';
import Navbar from './components/Navbar';
import ContactUs from './components/ContactUs';
import Dashboard from './components/Dashboard';
import CreateEvent from './components/CreateEvent';
import CreateIG from './components/CreateIG';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore } from 'redux'
import reducers from './reducers'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import { faArrowCircleLeft, faArrowCircleRight, faCircle } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(brands, faArrowCircleLeft, faArrowCircleRight, faCircle)

const firebaseConfig = {
    apiKey: "***REMOVED***",
    authDomain: "usc-website-206715.firebaseapp.com",
    databaseURL: "https://usc-website-206715.firebaseio.com",
    projectId: "usc-website-206715",
    storageBucket: "usc-website-206715.appspot.com",
    messagingSenderId: "115895791273",
    clientId: "115895791273-du64jmchflhmb0o7jec4e87klu5lccm0.apps.googleusercontent.com",
    scopes: [
             "profile",
             "https://www.googleapis.com/auth/calendar"
    ],
    discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
  };
firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(function(user) {
  // Make sure there is a valid user object
  if(user){
     const script = document.createElement("script");
     script.src = "https://apis.google.com/js/api.js";
     document.body.appendChild(script);

     script.onload = () => {
         window.gapi.load('client:auth2', () => {
           console.log(window.gapi)
           gapi.client.init({
             apiKey: firebaseConfig.apiKey,
             clientId: firebaseConfig.clientId,
             discoveryDocs: firebaseConfig.discoveryDocs,
             scope: firebaseConfig.scopes.join(' '),
           })
           // Loading is finished, so start the app
           .then(function() {
            // Make sure the Google API Client is properly signed in
            if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
              //startApp(user);
              console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token)
            } else {
              firebase.auth().signOut(); // Something went wrong, sign out
            }
          })
        });
     }

    document.getElementsByTagName('head')[0].appendChild(script);
  }
})

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  useFirestoreForProfile: true,
  enableLogging: false, // enable/disable Firebase's database logging
  attachAuthIsReady: true,
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config),
  reduxFirestore(firebase)
)(createStore)

const store = createStoreWithFirebase(reducers)

render(
  <Provider store={store}>
    <div>
      <Router>
        <div>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={AboutUs}/>
            <Route path="/events" component={Events}/>
            <Route path="/spaces" component={Spaces}/>
            <Route path="/contactus" component={ContactUs}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/createevent" component={CreateEvent}/>
            <Route path="/createig" component={CreateIG}/>
            <Route component={Home}/>
          </Switch>
        </div>
      </Router>
    </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

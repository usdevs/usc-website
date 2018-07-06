import React from 'react';
import { render } from 'react-snapshot';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { compose } from 'redux';
import { Provider } from 'react-redux';
import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'
import firebase from 'firebase'
import Home from './components/General/Home'
import AboutUs from './components/General/AboutUs'
import Events from './components/Events/Events'
import Spaces from './components/Events/Spaces'
import Navbar from './components/General/Navbar'
import ContactUs from './components/General/ContactUs'
import Dashboard from './components/General/Dashboard'
import CreateEvent from './components/Events/CreateEvent'
import ManageEvents from './components/Events/ManageEvents'
import EditEvent from './components/Events/EditEvent'
import EventAdmin from './components/Events/EventAdmin'
import CreateInterestGroup from './components/InterestGroups/CreateInterestGroup'
import InterestGroups from './components/InterestGroups/InterestGroups'
import InterestGroup from './components/InterestGroups/InterestGroup'
import ManageInterestGroups from './components/InterestGroups/ManageInterestGroups'
import EditInterestGroup from './components/InterestGroups/EditInterestGroup'
import InterestGroupAdmin from './components/InterestGroups/InterestGroupAdmin'
import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import { createStore } from 'redux'
import reducers from './reducers'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import { Jumbotron } from 'reactstrap'
import { faArrowCircleLeft, faArrowCircleRight, faCircle, faSpinner,
  faUpload, faPlus, faHeart, faSquare, faCalendarAlt, faFileAlt, faUserClock,
  faTrashAlt, faFrown, faUsers, faComments, faSignInAlt, faColumns, faSignOutAlt,
  faToolbox
} from '@fortawesome/fontawesome-free-solid'
import Typography from 'typography'
import { firebaseConfig } from './resources/config'
import { initialiseGAPI } from './utils/actions'

fontawesome.library.add(brands, faArrowCircleLeft, faArrowCircleRight, faCircle, faSpinner,
  faUpload, faPlus, faHeart, faSquare, faCalendarAlt, faFileAlt, faUserClock, faTrashAlt,
  faFrown, faUsers, faComments, faSignInAlt, faColumns, faSignOutAlt, faToolbox)


firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(function(user) {
  // Make sure there is a valid user object
  if(user){
     const script = document.createElement("script");
     script.src = "https://apis.google.com/js/api.js";
     document.body.appendChild(script);

     script.onload = () => {
         initialiseGAPI()
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

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.45,
  scaleRatio: 4,
  headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Avenir Next', 'sans-serif'],
  // See below for the full list of options.
})
typography.injectStyles()

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
            <Route path="/dashboard/:login" component={Dashboard}/>
            <Route path="/dashboard/" component={Dashboard}/>
            <Route path="/createevent" component={CreateEvent}/>
            <Route path="/manageevents" component={ManageEvents}/>
            <Route path="/editevent/:eventID" component={EditEvent}/>
            <Route path="/eventadmin" component={InterestGroupAdmin}/>
            <Route path="/createinterestgroup" component={CreateInterestGroup}/>
            <Route path="/interestgroups" component={InterestGroups}/>
            <Route path="/interestgroup/:igID" component={InterestGroup}/>
            <Route path="/manageinterestgroups" component={ManageInterestGroups}/>
            <Route path="/editinterestgroup/:igID" component={EditInterestGroup}/>
            <Route path="/interestgroupadmin" component={InterestGroupAdmin}/>
            <Route component={Home}/>
          </Switch>
          <Jumbotron className="mb-0"><h5 className="mb-0">© Copyright 2018. All Rights Reserved. NUS Students' University Scholars Club</h5></Jumbotron>
        </div>
      </Router>
    </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

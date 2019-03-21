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
//import EventAdmin from './components/Events/EventAdmin'
import CreateInterestGroup from './components/InterestGroups/CreateInterestGroup'
import Groups from './components/Groups/Groups'
import Group from './components/Groups/Group'
import GroupAdmin from './components/Groups/GroupAdmin'
import CreateGroup from './components/Groups/CreateGroup'
import CreateCircle from './components/Groups/CreateCircle'
import ManageGroups from './components/Groups/ManageGroups'
import EditGroup from './components/Groups/EditGroup'
import Settings from './components/Users/Settings'
import Modules from './components/Modules/Modules'
import Module from './components/Modules/Module'
import AddReview from './components/Modules/AddReview'
import EditReview from './components/Modules/EditReview'
import ManageReviews from './components/Modules/ManageReviews'
import ModuleAdmin from './components/Modules/ModuleAdmin'
import Feedback from './components/General/Feedback'
import IntlProg from './components/IntlProgs/IntlProg'
import IntlProgs from './components/IntlProgs/IntlProgs'
import CreateIntlProg from './components/IntlProgs/CreateIntlProg'
import CreateIntlProgReview from './components/IntlProgs/CreateIntlProgReview'
import ScrollToTop from './components/reusable/ScrollToTop'
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
  faToolbox, faChalkboardTeacher, faMobileAlt, faTimes, faComment, faGlobe, faRobot,
  faUtensils, faWrench, faBoxOpen
} from '@fortawesome/pro-solid-svg-icons'
import { fab, faTelegram } from '@fortawesome/free-brands-svg-icons'
import Typography from 'typography'
import { firebaseConfig } from './resources/config'
import { initialiseGAPI } from './actions/UsersActions'
import Can from './utils/Can'

fontawesome.library.add(brands, faArrowCircleLeft, faArrowCircleRight, faCircle, faSpinner,
  faUpload, faPlus, faHeart, faSquare, faCalendarAlt, faFileAlt, faUserClock, faTrashAlt,
  faFrown, faUsers, faComments, faSignInAlt, faColumns, faSignOutAlt, faToolbox, faChalkboardTeacher,
  faMobileAlt, faTimes, fab, faComment, faGlobe, faRobot, faUtensils, faWrench, faBoxOpen, faTelegram)


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
  attachAuthIsReady: true
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
        <ScrollToTop>
          <Navbar className="mb-3"/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={AboutUs}/>
            <Route path="/events" component={Events}/>
            <Route path="/spaces" component={Spaces}/>
            <Route path="/contactus" component={ContactUs}/>
            <Route path="/dashboard/:login" component={Dashboard}/>
            <Route path="/dashboard/" component={Dashboard}/>
            <Route path="/feedback" component={Feedback}/>
            <Route path="/createevent" component={CreateEvent}/>
            <Route path="/manageevents" component={ManageEvents}/>
            <Route path="/editevent/:eventID" component={EditEvent}/>
            <Route path="/createinterestgroup" component={CreateInterestGroup}/>
            <Route path="/createcircle" component={CreateCircle}/>
            <Route path="/groups" component={Groups}/>
            <Route path="/group/:groupID" component={Group}/>
            <Route path="/managegroups" component={ManageGroups}/>
            <Route path="/editgroup/:groupID" component={EditGroup}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/modules" component={Modules}/>
            <Route path="/module/:moduleID" component={Module}/>
            <Route path="/addreview/" component={AddReview}/>
            <Route path="/editreview/:reviewID" component={EditReview}/>
            <Route path="/managereviews" component={ManageReviews}/>
            <Route path="/intlprogs" component={IntlProgs}/>
            <Route path="/intlprog/:intlProgID" component={IntlProg}/>
            <Route path="/createintlprogreview" component={CreateIntlProgReview}/>
            <Route path="/createintlprog" component={CreateIntlProg}/>
            <Can I="manage" a="Admin">
              <div>
                <Route path="/creategroup" component={CreateGroup}/>
                <Route path="/eventadmin" component={GroupAdmin}/>
                <Route path="/groupadmin" component={GroupAdmin}/>
                <Route path="/moduleadmin" component={ModuleAdmin}/>
              </div>
            </Can>
            <Route component={Home}/>
          </Switch>
          <Jumbotron className="mt-5 mb-0"><h5 className="mb-0">© Copyright 2018. All Rights Reserved. NUS Students' University Scholars Club</h5></Jumbotron>
        </ScrollToTop>
      </Router>
    </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

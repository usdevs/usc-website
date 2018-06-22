import React from 'react';
import { render } from 'react-snapshot';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import './index.css';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Events from './components/Events';
import Spaces from './components/Spaces';
import Navbar from './components/Navbar';
import ContactUs from './components/ContactUs';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore } from 'redux'
import reducers from './reducers'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import { faArrowCircleLeft, faArrowCircleRight, faCircle } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(brands, faArrowCircleLeft, faArrowCircleRight, faCircle)

const store = createStore(reducers)

render(
  <Provider store={store}>
    <div>
      <Navbar/>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={AboutUs}/>
          <Route path="/events" component={Events}/>
          <Route path="/spaces" component={Spaces}/>
          <Route path="/contactus" component={ContactUs}/>
          <Route component={Home}/>
        </Switch>
      </Router>
    </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

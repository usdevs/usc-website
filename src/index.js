import React from 'react';
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Events from './components/Events';
import Navbar from './components/Navbar';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Navbar/>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={AboutUs}/>
          <Route path="/events" component={Events}/>
          <Route component={Home}/>
        </Switch>
      </Router>
    </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

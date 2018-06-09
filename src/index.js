import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Navbar from './components/Navbar';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers)

ReactDOM.render(
  <div>
    <Navbar/>
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={AboutUs}/>
        <Route component={Home}/>
      </Switch>
    </Router>
  </div>, document.getElementById('root'));
registerServiceWorker();

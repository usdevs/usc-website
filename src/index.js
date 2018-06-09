import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import Navbar from './Navbar';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers)

ReactDOM.render(
  <div>
    <Navbar/>
    <Router>
        <Route exact path="/" component={Home} />
    </Router>
  </div>, document.getElementById('root'));
registerServiceWorker();

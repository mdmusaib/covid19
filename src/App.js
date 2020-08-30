import React from 'react';

import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import * as Icon from 'react-feather';
import Navbar from './components/navbar';
import Home from './components/home';
import StateWiseComponent from './components/StateWisePage';
const history = require('history').createBrowserHistory;


function App() {
  const pages = [
    {
      pageLink: '/',
      view: Home,
      displayName: 'Home',
      animationDelayForNavbar: 0.2,
    },
    {
      pageLink: '/TN',
      view: StateWiseComponent,
      displayName: 'State',
      animationDelayForNavbar: 0.3,
    },
  ];
  return (
    
    <div className="App">
      
      
    
    <Router history={history}>
        <Route
          render={({location}) => (
            <div className="App">
              {/* <Navbar pages={pages} /> */}
              <Route exact path="/" render={() => <Redirect to="/" />} />
              <Switch location={location}>
                {pages.map((page, i) => {
                  return (
                    <Route
                      exact
                      path={page.pageLink}
                      component={page.view}
                      key={i}
                    />
                  );
                })}
                <Redirect to="/" />
              </Switch>
            </div>
          )}
        />
      </Router>
    
      </div>
    
  );
}

export default App;

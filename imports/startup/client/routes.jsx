import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { _ } from 'meteor/underscore';
// Import to load these templates

import AppContainer from '../../ui/containers/AppContainer.jsx';
import HomePageContainer from '../../ui/containers/HomePageContainer.jsx';

import LoginPage from '../../ui/pages/LoginPage.jsx';
import SignupPage from '../../ui/pages/SignupPage.jsx'

loadRoutes = () => {

  render(
    <Router history={browserHistory}>
      <Route path="login" component={LoginPage}/>
      <Route path="signup" component={SignupPage}/>
      <Route path="/" name="Home" component={AppContainer}>
        <IndexRoute component={HomePageContainer} />


        {/* <Route path="*" component={NotFoundPage}/> */}
      </Route>
    </Router>,
    document.getElementById('app')
  );
}

Meteor.startup( () => {

  // if(Collections.entries.find().count() > 0)
  loadRoutes();
});

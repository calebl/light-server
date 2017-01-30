import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { _ } from 'meteor/underscore';
import { Collections } from '/imports/api/contentful/collections.js';

class App extends Component{
  constructor(props) {
    super(props)

    this.params = props.params;

  }

  render(){

    return (
      <div id="container" className="remodal-bg">
        <section id="menu">
        </section>

        <div className="content-overlay"></div>

        <div id="content-container">
          {this.props.children}
        </div>

      </div>
    )
  }
}

export default AppContainer = createContainer(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it

  return {
    user: Meteor.user(),
  };
}, App);

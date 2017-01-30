import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';


class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: ''
    };
  }


  render(){
    let currentUser = this.props.currentUser;
    let userDataAvailable = (currentUser !== undefined);
    let loggedIn = (currentUser && userDataAvailable);
    return (
      <div>
        <div className="container">
          <h1 className="text-center">
            { loggedIn ? 'Welcome '+currentUser.username : '' }
          </h1>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  username: React.PropTypes.string
}

export default HomePageContainer = createContainer(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it

  const currentUser = Meteor.user();
    return {
      currentUser,
    };
}, HomePage);

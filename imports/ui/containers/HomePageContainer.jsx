import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';

import { Messages } from '/imports/api/messages.js';
import { Users } from '/imports/api/users.js';
import ConversationContainer from '/imports/ui/containers/ConversationContainer.jsx';


class HomePage extends Component {
  constructor(props){
    super(props);

    this.state = {conversationId: ''}
    this.selectConversation = this.selectConversation.bind(this)
  }

  selectConversation(e){
    e.preventDefault()

    this.setState({conversationId: e.target.id})

  }

  renderConversations(){
    return _.map(this.props.users, (user, key) => {
      if(user._id != Meteor.userId())
        return <li onClick={this.selectConversation} id={user._id}  key={user._id}>{user.username}</li>;
    });
  }

  render(){
    let currentUser = this.props.currentUser;
    let userDataAvailable = (currentUser !== undefined);
    let loggedIn = (currentUser && userDataAvailable);
    return (
      <div>
        <div className="container">
          <h1 className="text-center">
            { loggedIn ? 'Welcome ' + currentUser.username : '' }
          </h1>
          <div className="container">

            <div className="row">
              <div className="col-xs-4">
                <legend>Users</legend>
                <ul className="conversations">
                  {this.renderConversations()}
                </ul>
              </div>
              <div className="col-xs-8">
                <legend>Conversation</legend>
                <ConversationContainer conversationId={this.state.conversationId} />
              </div>
            </div>
          </div>
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

  const usersHandle = Meteor.subscribe('users')
  const loading = !usersHandle.ready();
  let users = Users.find({},{_id: 1, username: 1}).fetch();

  return {
    currentUser,
    loading,
    users
  };
}, HomePage);

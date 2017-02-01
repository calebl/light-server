import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';

import Message from '/imports/ui/components/Message.jsx';
import { Messages } from '/imports/api/messages.js';

class Conversation extends Component {
  constructor(props){
    super(props);

    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  renderMessages() {
    return this.props.messages.map((message) => {
      return <Message key={message._id} message={message} />;
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();

    Meteor.call("messages.insert", this.state.value, Meteor.userId(), this.props.recipientId );

    this.setState({value: ''});
  }

  renderForm() {
    return <form onSubmit={this.handleSubmit} >
      <input
        type="text"
        ref="textInput"
        name="message"
        value={this.state.value}
        onChange={this.handleChange}
        placeholder="Enter message..." />
    </form>
  }
  render() {
    if(this.props.recipientId == '')
      return(<div>Select a conversation</div>)
    else
      return(
        <div>
          <ul>
            {this.renderMessages()}
          </ul>

          {this.renderForm()}
        </div>


      )
  }
}

export default ConversationContainer = createContainer( props => {
  const messagesHandle = Meteor.subscribe('conversation', props.conversationId);
  const loading = !messagesHandle.ready();
  const currentUser = Meteor.user();
  let messages = Messages.find().fetch();

  return {
    recipientId: props.conversationId,
    messages
  }
}, Conversation)

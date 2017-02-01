import React, { Component } from 'react';
import moment from 'moment';
import {Meteor} from 'meteor/meteor';


export default class Message extends Component {

  formatTime(time) {
    return moment(time).format('h:mm A');
  }

  render() {
    let isRecipient = this.props.message.recipient.id == Meteor.userId();
    var style = {}
    if(isRecipient) {
      style['color'] = 'blue';
    }

    return (
      <li>
        <div style={style}>
          {this.formatTime(this.props.message.createdAt)} {this.props.message.sender.username} - {this.props.message.text}
        </div>
      </li>
    );
  }
}

Message.propTypes = {
  message: React.PropTypes.object.isRequired
}

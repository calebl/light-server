import React, {
  Component
} from 'react';
import moment from 'moment';
import {Meteor} from 'meteor/meteor';


export default class Message extends Component {

  formatTime(time) {
    return moment(time).format('h:mm A');
  }

  render() {
    let isRecipient = this.props.message.recipient.id === Meteor.userId();
    var style = {};
    if(isRecipient) {
      style['textAlign'] = 'left';
    } else {
      style['color'] = 'blue';
      style['textAlign'] = 'right';
    }

    return (
      <li className="message">
        <div style={style}>
          <div className="text">
          {this.props.message.text}
          </div>

          <div className="signature">
            <small>{this.formatTime(this.props.message.createdAt)} {this.props.message.sender.username}</small>
          </div>
        </div>

      </li>
    );
  }
}

Message.propTypes = {
  message: React.PropTypes.object.isRequired
};

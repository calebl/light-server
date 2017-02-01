import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('messages', function messagesPublication() {
    return Messages.find({
      $or: [
        { 'sender.id': this.userId },
        { 'recipient.id': this.userId },
      ],
    });
  });

  Meteor.publish('conversation', function messagesPublication(userId) {
    return Messages.find({
      $or: [
        { 'sender.id': userId, 'recipient.id': this.userId },
        { 'recipient.id': userId, 'sender.id': this.userId },
      ],
    });
  });


  Meteor.methods({
    'messages.insert'(text, senderId, recipientId) {
      check(text, String);
      check(senderId, String);
      check(recipientId, String);

      // Make sure the user is logged in before inserting a task
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      let sender = Meteor.users.findOne({_id: senderId})
      if(! sender){
        throw new Meteor.Error('sender-does-not-exist');
      }

      let recipient = Meteor.users.findOne({_id: recipientId})
      if(! recipient){
        throw new Meteor.Error('recipient-does-not-exist');
      }

      Messages.insert({
        text: text,
        createdAt: new Date(),
        checked: false,
        sender: {
          id: sender._id,
          username: sender.username
        },
        recipient: {
          id: recipient._id,
          username: recipient.username
        }
      });
    },
    'messages.setChecked'(messageId, setChecked) {
      check(messageId, String);
      check(setChecked, Boolean);

      const message = Messages.findOne(taskId);
      if (message.recipient.id != this.userId) {
        // If the task is private, make sure only the owner can check it off
        throw new Meteor.Error('not-authorized');
      }

      Messages.update(messageId, { $set: { checked: setChecked } });
    },
  });
}

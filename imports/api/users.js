import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = Meteor.users;

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('users', function usersPublication() {
    return Users.find({},{fields: {_id: 1, username: 1}});
  });
}

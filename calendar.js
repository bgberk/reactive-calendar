if (Meteor.isClient) {
	Accounts.ui.config({
	  passwordSignupFields: 'USERNAME_AND_EMAIL'
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.publish('events', function(){
      return Events.find({},{sort: {start: 1}});
    });

    Meteor.publish('messages', function(){
      return MessageList.find({},{sort: {createdAt: -1}});
    });

    Meteor.publish('studentNames', function(){
      return Meteor.users.find({},{fields: {profile: 1, username: 1}})
    })
});
}
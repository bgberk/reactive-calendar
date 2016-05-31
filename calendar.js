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
});
}
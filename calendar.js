if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.publish('events', function(){
      return Events.find();
    });
  });
}

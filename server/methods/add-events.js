Meteor.methods({
  addEvent( event ) {
    check( event, {
      title: String,
      start: String,
      end: String,
      location: String,
      description: String,
      type: String,
      confirmed: Number,
      interested: Number,
      attending: [String]
    });

    try {
      return Events.insert( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
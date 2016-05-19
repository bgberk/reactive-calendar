Meteor.methods({
  editEvent( event ) {
    check( event, {
      _id: String,
      title: Match.Optional( String ),
      start: String,
      end: String,
      location: Match.Optional( String ),
      description: Match.Optional( String ),
      type: Match.Optional( String ),
      confirmed: Match.Optional( Number ),
      interested: Match.Optional( Number )
    });

    try {
      return Events.update( event._id, {
        $set: event
      });
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
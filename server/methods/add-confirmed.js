Meteor.methods({
  addConfirmed( event ) {
    userId = Meteor.userId();
    try {
      return Events.update(event._id, 
                          { $inc: {confirmed: 1},
                            $addToSet: {attending: userId}}
        );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },

  removeConfirmed( event ) {
    userId = Meteor.userId();
    try {
      return Events.update(event._id, 
                          { $inc: {confirmed: -1},
                            $pull: {attending: userId}}
        );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
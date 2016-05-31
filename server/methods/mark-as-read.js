Meteor.methods({
  markAsRead( message ) {
    userId = Meteor.userId();
    try {
      return MessageList.update(message._id, 
                          {$addToSet: {readBy: userId}}
        );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },

  markAsUnread( message ) {
    userId = Meteor.userId();
    try {
      return MessageList.update(message._id, 
                          {$pull: {readBy: userId}}
        );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
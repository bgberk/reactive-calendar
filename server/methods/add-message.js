Meteor.methods({
	sendMessage (messageItem) {
		try {
	      return MessageList.insert( messageItem );
	    } catch ( exception ) {
	      throw new Meteor.Error( '500', `${ exception }` );
	    }
	}
})
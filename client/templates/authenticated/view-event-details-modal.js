Template.viewEventDetailsModal.helpers({
	event(){
		let detailsModal = Session.get( 'detailsModal' );
		if(detailsModal) {
			event = Events.findOne( detailsModal.event );
			return event
		} else {
			return
		}
	},

	'isConfirmed': function(){
		let detailsModal = Session.get( 'detailsModal' );
		if(detailsModal) {
			event = Events.findOne( detailsModal.event);
			var userId = Meteor.userId();
			if (userId && !_.include(event.attending, userId)) {
				return 'btn-success confirmed';
			} else {
				return 'btn-default disabled'
			}
		}
	}
});

Template.viewEventDetailsModal.events({
	'click .confirmed': function(event) {
		let detailsModal = Session.get('detailsModal');
		if(detailsModal) {
			let event = Events.findOne( detailsModal.event );
			Meteor.call('addConfirmed', event)
		}
	},

	'click .interested': function(event) {
		let detailsModal = Session.get('detailsModal');
		if(detailsModal) {
			let event = Events.findOne( detailsModal.event );
			Meteor.call('addInterested', event)
		}
	}
})
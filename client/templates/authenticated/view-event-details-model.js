Template.viewEventDetailsModal.helpers({
	event(){
		let detailsModal = Session.get( 'detailsModal' );
		return Events.findOne( detailsModal.event )
	},

	start(){
		let detailsModal = Session.get( 'detailsModal' );
		let event = Events.findOne( detailsModal.event)
		return moment(event.start).format('hh:mm a')
	},

	end(){
		let detailsModal = Session.get( 'detailsModal' );
		let event = Events.findOne( detailsModal.event)
		return moment(event.end).format('hh:mm a')	
	}
})
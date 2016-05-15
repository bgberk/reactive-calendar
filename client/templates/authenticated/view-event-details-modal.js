Template.viewEventDetailsModal.helpers({
	event(){
		let detailsModal = Session.get( 'detailsModal' );
		if(detailsModal) {
			return Events.findOne( detailsModal.event )
		} else {
			return
		}
	}
})
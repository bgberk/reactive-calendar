Template.viewEventDetailsModal.helpers({

	startTime: function(){
		var startTime = this.start;
		if (startTime) {
			return moment(startTime).format('MMMM Do, h:mm a')
		}
	},

	endTime: function() {
		var endTime = this.end;
		if (endTime) {
			return moment(endTime).format('MMMM Do, h:mm a')
		}
	}
});
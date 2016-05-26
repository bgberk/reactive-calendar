Template.guestDetails.onRendered(function(){
	var content = Template.currentData();
	if (content) {
		var attendingUsers = content.attending;
		attendingUsers.shift();
		var string = attendingUsers.join("</br>");
		this.$('.js-view-guests').popover({
		  title: 'Who\'s coming?',
		  content: string,
		  trigger: 'hover focus',
		  html: true,
		  placement: 'bottom'
		});
	}; 
})

Template.guestDetails.helpers({
	'isConfirmed': function(){
		let currentUserId = Meteor.userId();
		let activity = this.attending;
		if (currentUserId && activity){
			if(!_.include(activity, currentUserId)){
				return false
			} else {
				return true
			}
		}
	},

	'attendingUsers': function(){
		let attendingUsers = this.attending;
		return attendingUsers
	},

	'isActivity': function(){
		if(this.type == 'Activity') {
			return true
		} else {
			return false
		}
	},

	'hasMax': function(){
		if(this.max) {
			if(this.max > (this.attending.length - 1)) {
				return true
			}
		} else {
			return false
		}
	},

	'maxLeft': function() {
		var maxLeft = (this.max - this.attending.length + 1);
		return maxLeft
	}
})

Template.guestDetails.events({
	'click .confirm': function(event) {
		Meteor.call('addConfirmed', this);
	},

	'click .dropout': function(event) {
		Meteor.call('removeConfirmed', this);
	}
})
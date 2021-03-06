Template.guestDetails.onCreated(function(){
	let template = Template.instance();
	template.subscribe('studentNames')
});

Template.guestDetails.onRendered(function(){
	var content = Template.currentData();
	if (content) {
		var attendingUsers = content.attending;
		attendingUsers.shift();
		var attendingNames = [];
		$.each(attendingUsers, function(index, value){
			let userObj = (Meteor.users.findOne({_id: value}));
			if(userObj) {
				if (userObj.profile) {
					attendingNames.push(userObj.profile.name)
				} else if (userObj.username) {
					attendingNames.push(userObj.username)
				}
			}
		});
		var string = attendingNames.join("</br>");
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
		if(maxLeft !== 0) {
			return maxLeft
		} else {
			return "Add me to the waiting list; no"
		}
	}
})

Template.guestDetails.events({
	'click .confirm': function(event) {
		if (Meteor.user()) {
			Meteor.call('addConfirmed', this);
		}
	},

	'click .dropout': function(event) {
		if (Meteor.user()) {
			Meteor.call('removeConfirmed', this);
		}
	}
})
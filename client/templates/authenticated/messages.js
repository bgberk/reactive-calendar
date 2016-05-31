Template.messages.onCreated( () => {
	let template = Template.instance();
	template.subscribe('messages');
});

Template.messages.helpers({
	'messages': function() {
		return MessageList.find();
	},
});

Template.messageContent.helpers({
	'readStatus': function() {
		let readBy = this.readBy;
		let currentUser = Meteor.userId();
		if (currentUser && readBy){
			if(!_.include(readBy, currentUser)){
				return 'panel-info'
			} else {
				return 'panel-default'
			}
		}		
	}	
})

Template.messageContent.events({
	'click .panel-heading': function() {
		let readBy = this.readBy;
		let currentUser = Meteor.userId();
		if (Meteor.user()) {
			if(!_.include(readBy, currentUser)){
				Meteor.call('markAsRead', this);
			} else {
				Meteor.call('markAsUnread', this)
			}
		}
	}
})

Template.registerHelper('momentToHuman', (momentDate) => {
  if (momentDate) {
    return moment(momentDate).format( 'MMMM Do, HH:MMa')
  }
})
Template.mobileNavbar.onCreated( () => {
	let template = Template.instance();
	template.subscribe('messages');
});

Template.mobileNavbar.events({
	'click #messages': function(){
		Router.go('/messages')
	},

	'click #calendar': function(){
		Router.go('/calendar')
	},
})

Template.mobileNavbar.helpers({
	activeIfTemplateIs: function (template) {
		var currentRoute = Router.current().route._path;
		return template === currentRoute ? 'active' : '';
	},

	'unread': function() {
		let currentUser = Meteor.userId();
		let unread = MessageList.find({readBy: {$nin: [currentUser]}}).count();
		if(unread > 0) {
			return unread
		}
	}	
})
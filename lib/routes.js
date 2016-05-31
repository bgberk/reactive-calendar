Router.configure({
	layoutTemplate: 'appLayout'
});

Router.route('/', {
	template: 'studentView'
});

Router.route('/dev', {
	template: 'dev'
});

Router.route('/manager', {
	template: 'calendar'
});

/// Student Routes ///

Router.route('/calendar', function() {
	this.render('studentView');
	this.layout('appLayout')
})

Router.route('/messages', function() {
	this.render('messages');
	this.layout('appLayout')
})
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
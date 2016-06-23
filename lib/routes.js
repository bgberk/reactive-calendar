Router.configure({
	layoutTemplate: 'appLayout'
});

AccountsTemplates.configure({
	defaultLayout: 'appLayout',
	showForgotPasswordLink: true,
	negativeValidation: true,
	positiveValidation: true,
	negativeFeedback: true,
	positiveFeedback: true,
	showLabels: false
});

/// Allow username and email ///
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      placeholder: {
      	signUp: "First and last name"
      },
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  pwd
]);

/// end of username config ///

Router.route('/', {
	template: 'studentView'
});

Router.route('/dev', {
	template: 'dev'
});

Router.route('/manager', {
	onBeforeAction: function (pause) {
		if (Meteor.userId() == "zgdiRa5LAefadGX4A") {
			this.render('calendar');
		} else {
			this.redirect('/calendar')
		}
	}
});

/// Student Routes ///

Router.route('/calendar', function() {
	this.render('studentView');
	this.layout('appLayout')
});

Router.route('/messages', function() {
	this.render('messages');
	this.layout('appLayout')
});

Router.route('/landing', {
	template: 'landing'
})

Router.route('/map', {
	template: 'map'
})

/// Routes for signin ///
AccountsTemplates.configureRoute('signIn', {
	name: 'signin',
	path: '/signin',
	template: 'landing',
	redirect: '/calendar'
});

Router.plugin('ensureSignedIn', {
	except: ['signin']
});
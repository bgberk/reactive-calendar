Events = new Mongo.Collection('events');

Events.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Events.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

let EventsSchema = new SimpleSchema({
	'title': {
		type: String,
		label: 'The title of this event'
	},
	'start': {
		type: String,
		label: 'When this event starts'
	},
	'end': {
		type: String,
		label: 'When this event ends'
	},
	'type': {
		type: String,
		label: 'What type of event is this?',
		allowedValues: [ 'Birthday', 'Corporate', 'Wedding', 'Miscellaneous']
	},
	'guests': {
		type: Number,
		label: 'How many guests are expected'
	}
});

Events.attachSchema(EventsSchema);
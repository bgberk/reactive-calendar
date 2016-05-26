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
	'location': {
		type: String,
		label: 'Where this event takes place'
	},
	'description': {
		type: String,
		label: 'Short description of event'
	},
	'type': {
		type: String,
		label: 'What type of event is this?',
		allowedValues: [ 'Activity', 'Academic', 'Trip', 'Meeting']
	},
	'confirmed': {
		type: Number,
		label: 'How many are confirmed'
	},
	'max': {
		type: Number,
		label: 'Maximum allowed',
		optional: true
	},
	'attending': {
		type: [String],
		label: 'Who is attending'
	}
});

Events.attachSchema(EventsSchema);
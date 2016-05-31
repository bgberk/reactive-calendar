MessageList = new Mongo.Collection('messages');

MessageList.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

MessageList.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});
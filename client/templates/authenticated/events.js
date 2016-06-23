let isPast = ( date ) => {
	let today = moment().format();
	return moment( today ).isAfter( date );
};

Template.calendar.onCreated( () => {
	let template = Template.instance();
	template.subscribe('events');
});

Template.calendar.onRendered( () => {
  $( '#events-calendar' ).fullCalendar({
  	header: {
      left: 'title',
      center: 'month, agendaWeek, agendaDay',
      right: 'prev, next'
    },

    fixedWeekCount: false,

    editable: true,

    events(start, end, timezone, callback) {
  		let data = Events.find().fetch().map( (event) => {
  			event.editable = !isPast( event.start );
  			return event;
  		});

  		if (data) {
  			callback(data)
  		};
  	},

  	eventRender( event, element ) {
  		element.find( '.fc-content' ).html(
  			`<h4>${ event.title }</h4>
  			<p class="guest-count">${ event.confirmed } Confirmed</p>
  			<p class="type-${ event.type }">#${ event.type }</p>
  			`
  		);
  	},

    eventDrop( event, delta, revert ) {
      let date = event.start.format();
      if ( !isPast( date ) ) {
        let update = {
          _id: event._id,
          start: date,
          end: event.end.format()
        };

        Meteor.call( 'editEvent', update, ( error ) => {
          if ( error ) {
            Bert.alert( error.reason, 'danger' );
          }
        });
      } else {
        revert();
        Bert.alert( 'Sorry, you can\'t move items to the past!', 'danger' );
      }
    },

    eventResize( event, delta, revert) {
      let update = {
        _id: event._id,
        start: event.start.format(),
        end: event.end.format()
      };

      Meteor.call( 'editEvent', update);
      Bert.alert( 'Event updated to end at '+ event.end.format() + '!', 'success')
      },

  	dayClick( date, jsEvent, view ) {
      if(view.name == 'month') {
        Session.set('eventModal', {type: 'add', start: date.format(), end: date.format() });
        $( '#add-edit-event-modal').modal('show');
      } else {
        Session.set('eventModal', {type: 'add', start: date.format(), end: date.add(2, 'hours').format() });
        $( '#add-edit-event-modal').modal('show');
      }
  	},

  	eventClick( event ) {
  		Session.set('eventModal', {type: 'edit', event:event._id } );
  		$( '#add-edit-event-modal').modal('show');
  	}
  });

  Tracker.autorun( () => {
  	Events.find().fetch();
  	$( '#events-calendar').fullCalendar( 'refetchEvents');
  });
});

//////////////////////
/// MESSAGE CENTER ///
//////////////////////

Template.calendar.events({
  'submit form': function(event){
    event.preventDefault();
    messageItem = {
      subject: event.target.subject.value,
      from: event.target.from.value,
      createdAt: new Date(),
      to: event.target.sendto.value,
      body: event.target.body.value,
      readBy: []
    };
    Meteor.call('sendMessage', messageItem, (error) => {
      if (error) {
        console.log(error);
        Bert.alert(error.reason, 'danger')
      } else {
        Bert.alert('Message sent!', 'success')
      }  
    });
    event.target.subject.value = "";
    event.target.from.value = "";
    event.target.sendto.value = "";
    event.target.body.value = "";
  }
})
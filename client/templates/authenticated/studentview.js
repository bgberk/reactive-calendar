Template.studentView.onCreated( () => {
	let template = Template.instance();
	template.subscribe('events');
});

Template.studentView.onRendered( () => {
  $( '#student-calendar' ).fullCalendar({
  	header: {
      left: 'title',
      center: 'month, agendaWeek, agendaDay',
      right: 'prev, next'
    },

    events(start, end, timezone, callback) {
  		let data = Events.find().fetch().map( (event) => {
  			event.editable = false;
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

  	dayClick( date ) {
		$( '#student-calendar').fullCalendar( 'gotoDate', date );
  		$( '#student-calendar').fullCalendar( 'changeView', 'agendaDay');
  	},

  	eventClick( event ) {
  		Session.set('detailsModal', {event:event._id } );
  		$( '#view-event-details-modal').modal('show');
  	}
  });

  Tracker.autorun( () => {
  	Events.find().fetch();
  	$( '#student-calendar').fullCalendar( 'refetchEvents');
  });
});
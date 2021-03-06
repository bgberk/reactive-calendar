(function() {
    'strict';


    var FC = $.fullCalendar, // a reference to FullCalendar's root namespace
        View = FC.View, // the class that all views must inherit from
        ListView; // our subclass

    ListView = View.extend({ // make a subclass of View

        computeRange: function(date) {
            var intervalDuration = moment.duration(this.opt('duration') || this.constructor.duration || {
                days: 7
            });
            var intervalUnit = 'day';
            var intervalStart = date.clone().startOf(intervalUnit);
            var intervalEnd = intervalStart.clone().add(intervalDuration);
            var start, end;

            // normalize the range's time-ambiguity
            intervalStart.stripTime();
            intervalEnd.stripTime();

            start = intervalStart.clone();
            start = this.skipHiddenDays(start);
            end = intervalEnd.clone();
            end = this.skipHiddenDays(end, -1, true); // exclusively move backwards

            return {
                intervalDuration: intervalDuration,
                intervalUnit: intervalUnit,
                intervalStart: intervalStart,
                intervalEnd: intervalEnd,
                start: start,
                end: end
            };
        },

        initialize: function() {
            // called once when the view is instantiated, when the user switches to the view.
            // initialize member variables or do other setup tasks.

            View.prototype.initialize.apply(this, arguments);
        },

        render: function() {

            // responsible for displaying the skeleton of the view within the already-defined
            // this.el, a jQuery element.
            //View.prototype.render.apply(this, arguments);
        },

        computeTitle: function() {
            //console.log(this);
            return (this.start.format('MMM D') + '-' + this.end.format('MMM D'));
        },

        /*setHeight: function(height, isAuto) {
            // responsible for adjusting the pixel-height of the view. if isAuto is true, the
            // view may be its natural height, and `height` becomes merely a suggestion.
            this.el.height(height);

            View.prototype.setHeight.apply(this, arguments);
        },*/

        renderEvents: function(events) {
            // reponsible for rendering the given Event Objects

            var noDebug = true;
            noDebug || console.log(events);

            var eventsCopy = events.slice().reverse(); //copy and reverse so we can modify while looping
            
            var tbody = $('<tbody></tbody>');

            this.scrollerEl = this.el.addClass('fc-scroller');

            this.el.html('')
                .append('<table style="border: 0; width:100%"></table>').children()
                .append(tbody);

            var periodEnd = this.end.clone(); //clone so as to not accidentally modify

            noDebug || console.log('Period start: ' + this.start.format("YYYY MM DD HH:mm:ss Z") + ', and end: ' + this.end.format("YYYY MM DD HH:mm:ss Z"));

            var currentDayStart = this.start.clone();
            while (currentDayStart.isBefore(periodEnd)) {

                var didAddDayHeader = false;
                var currentDayEnd = currentDayStart.clone().add(1, 'days');

                noDebug || console.log('=== this day start: ' + currentDayStart.format("YYYY MM DD HH:mm:ss Z") + ', and end: ' + currentDayEnd.format("YYYY MM DD HH:mm:ss Z"));

                //Assume events were ordered descending originally (notice we reversed them)
                for (var i = eventsCopy.length - 1; i >= 0; --i) {
                    var e = eventsCopy[i];

                    var eventStart = e.start.clone();
                    var eventEnd = this.calendar.getEventEnd(e);

                    if (!noDebug) {
                        console.log(e.title);
                        console.log('event index: ' + (events.length - i - 1) + ', and in copy: ' + i);
                        console.log('event start: ' + eventStart.format("YYYY MM DD HH:mm:ss Z"));
                        console.log('event end: ' + this.calendar.getEventEnd(e).format("YYYY MM DD HH:mm:ss Z"));
                        console.log('currentDayEnd: ' + currentDayEnd.format("YYYY MM DD HH:mm:ss Z"));
                        console.log(currentDayEnd.isAfter(eventStart));
                    }

                    if (currentDayStart.isAfter(eventEnd) || (currentDayStart.isSame(eventEnd) && !eventStart.isSame(eventEnd)) || periodEnd.isBefore(eventStart)) {
                        eventsCopy.splice(i, 1);
                        noDebug || console.log("--- Removed the above event");
                    } else if (currentDayEnd.isAfter(eventStart)) {
                        //We found an event to display

                        noDebug || console.log("+++ We added the above event");

                        if (!didAddDayHeader) {
                            tbody.append('\
                                <tr class="fc-header" date="">\
                                    <th colspan="3">\
                                        <span class="fc-header-day">' + currentDayStart.format('dddd') + '</span>\
                                        <span class="fc-header-date">' + currentDayStart.format('Do') + '</span>\
                                    </th>\
                                </tr>');

                            didAddDayHeader = true;
                        }

                        /*
                        <td class="fc-event-handle">\
                                <span class="fc-event"></span>\
                            </td>\
                         */

                        var segEl = $('\
                        <tr class="fc-row fc-event-container fc-content">\
                            <td class="fc-time">' + (e.allDay ? ('All-day') : e.start.format('H:mm') + '-' + e.end.format('H:mm')) + '</td>\
                            <td>\
                                <div class="fc-title"><strong>' + e.title + '</strong></div>\
                                <div class="fc-description">@' + e.location + '</div>\
                            </td>\
                            <td>\
                                <div class="fc-type"><p class="type-' + e.type + '">#' + e.type + '</p></div>\
                            </td>\
                        </tr>');
                        tbody.append(segEl);

                        //Tried to use fullcalendar code for this stuff but to no avail
                        (function(_this, myEvent, mySegEl) { //temp bug fix because 'e' seems to change
                            segEl.on('click', function(ev) {
                                return _this.trigger('eventClick', mySegEl, myEvent, ev);
                            });
                        })(this, e, segEl);

                    }

                }

                currentDayStart.add(1, 'days');
            }

            this.updateHeight();

            View.prototype.renderEvents.apply(this, arguments);
        },

        destroyEvents: function() {
            // responsible for undoing everything in renderEvents
            //View.prototype.destroyEvents.apply(this, arguments);
        },

        renderSelection: function(range) {
            // accepts a {start,end} object made of Moments, and must render the selection
            View.prototype.renderSelection.apply(this, arguments);
        },

        destroySelection: function() {
            // responsible for undoing everything in renderSelection
            View.prototype.destroySelection.apply(this, arguments);
        }

    });

    FC.views.list = ListView; // register our class with the view system

})();
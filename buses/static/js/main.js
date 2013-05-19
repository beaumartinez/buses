(function() {
    'use strict';

    requirejs.config({
        shim: {
            handlebars: {
                exports: 'Handlebars',
            },
            underscore: {
                exports: '_',
            },
        },
    });

    require(['fastclick', 'handlebars', 'jquery', 'moment', 'underscore'], function(FastClick, Handlebars, $, moment, _) {
        $(function() {
            FastClick.attach(document.body);

            // Handlebars

            var stopTitleTemplate = document.getElementById('stop-title-template').innerHTML;
            Handlebars.registerPartial('stopTitleTemplate', stopTitleTemplate);

            stopTitleTemplate = Handlebars.compile(stopTitleTemplate);

            var arrivalTemplate = document.getElementById('arrival-template').innerHTML;
            Handlebars.registerPartial('arrivalTemplate', arrivalTemplate);

            var stopTemplate = document.getElementById('stop-template').innerHTML;
            stopTemplate = Handlebars.compile(stopTemplate);

            // Script

            navigator.geolocation.getCurrentPosition(function(geoposition) {
                var loading = document.getElementById('loading');
                loading.innerHTML = "Loading bus arrival data...";

                $.ajax('/arrival-times/' + geoposition.coords.latitude + '/' + geoposition.coords.longitude + '/').done(function(responseArrivals) {
                    if (responseArrivals.length === 0) {
                        var loading = document.getElementById('loading');
                        loading.innerHTML = "No bus arrival data. There might not be any buses for a while. TFL services might also be down. Please try again later.";
                    } else {
                        var stopLookup = _.groupBy(responseArrivals, 'stopId');
                        console.log(stopLookup);

                        var stopIds = Object.getOwnPropertyNames(stopLookup);
                        stopIds = stopIds.sort(function(a, b) {
                            var aExample = stopLookup[a][0];
                            var bExample = stopLookup[b][0];

                            return aExample.distance - bExample.distance;
                        });

                        stopIds.forEach(function(stopId) {
                            var arrivals = stopLookup[stopId];
                            arrivals = _.sortBy(arrivals, 'eta');

                            // Timeago ETAs
                            arrivals.map(function(arrival) {
                                var eta = moment(arrival.eta);
                                eta = eta.fromNow(true);

                                arrival.eta = eta;

                                return arrival;
                            });
                            arrivals.map(function(arrival) {
                                arrival.distance = arrival.distance * 1000;
                                arrival.distance = arrival.distance.toFixed(0);

                                return arrival;
                            });

                            var exampleArrival = arrivals[0];

                            var renderedTemplate = stopTemplate({
                                exampleArrival: exampleArrival,
                                arrivals: arrivals,
                            });

                            // Add template, hide loading, add attribution

                            var loading = document.getElementById('loading');
                            loading.classList.add('hidden');

                            var content = document.getElementById('content');
                            content.innerHTML += renderedTemplate;

                            var toggleAll = document.getElementById('toggle-all');
                            toggleAll.classList.remove('hidden');
                        });
                    }
                }).fail(function(response) {
                    var loading = document.getElementById('loading');

                    if (response.status === 502) {
                        loading.innerHTML = "TFL services are down. Please try again later.";
                    } else {
                        loading.innerHTML = "Couldn't load bus arrival data. Please try again later.";
                    }
                });
            }, function(error) {
                var loading = document.getElementById('loading');
                loading.innerHTML = "Couldn't get location data.";
            });

            $('body').on('click', 'a[href=#toggle]', function(event) {
                event.preventDefault();

                $(event.target).parents('.stop').toggleClass('toggled');
            });
                
            $('a[href=#toggle-all]').click(function(event) {
                event.preventDefault();

                var stops = $('.stop');
                var hiddenStops = $('.stop.toggled');

                if (hiddenStops.length === 0) {
                    stops.addClass('toggled');
                } else if (hiddenStops.length !== stops.length) {
                    stops.addClass('toggled');
                } else {
                    stops.removeClass('toggled');
                }
            });
        });
    });

    require(['ga']);
})();

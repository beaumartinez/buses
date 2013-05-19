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

            var loading = document.getElementById('loading');
            var error = document.getElementById('error');

            var content = document.getElementById('content');

            var lastUpdated = document.getElementById('last-updated');
            var accuracy = document.getElementById('accuracy');

            function _error(message) {
                error.innerHTML = message;

                loading.classList.add('hidden');
                error.classList.remove('hidden');
            }

            function _loading(message) {
                loading.innerHTML = message;

                loading.classList.remove('hidden');
                error.classList.add('hidden');
            }

            navigator.geolocation.watchPosition(function(geoposition) {
                _loading("Loading bus arrival data...");

                $.ajax('/arrival-times/' + geoposition.coords.latitude + '/' + geoposition.coords.longitude + '/').done(function(responseArrivals) {
                    if (responseArrivals.length === 0) {
                        _error("No bus arrival data. There might not be any buses for a while. TFL services might also be down. Please try again later.");
                    } else {
                        content.innerHTML = '';

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

                            content.innerHTML += renderedTemplate;
                        });

                        lastUpdated.parentNode.classList.remove('hidden');
                        lastUpdated.innerHTML = moment().format('HH:mm:ss');

                        accuracy.innerHTML = geoposition.coords.accuracy;

                        loading.classList.add('hidden');
                    }
                }).fail(function(response) {
                    var errorMessage = (response.status === 502) ? "TFL services are down." : "Couldn't load bus arrival data.";
                    errorMessage += " " + "Please try again later.";

                    _error(errorMessage);
                });
            }, function(error) {
                _error("Couldn't get location data.");
            });

            $('body').on('click', 'a[href=#toggle]', function(event) {
                event.preventDefault();

                $(event.target).parents('.stop').toggleClass('toggled');
            });
        });
    });

    require(['ga']);
})();

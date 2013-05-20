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
            livestamp: {
                deps: ['jquery', 'moment',],
                exports: 'livestamp',
            },
        },
    });

    require(['fastclick', 'handlebars', 'jquery', 'moment', 'underscore', 'livestamp'], function(FastClick, Handlebars, $, moment, _) {
        $(function() {
            FastClick.attach(document.body);

            $.livestamp.interval(10);

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
            var lastUpdatedTimeago = document.getElementById('last-updated-timeago');
            var accuracy = document.getElementById('accuracy');

            function _error(message) {
                error.innerHTML = message;

                loading.classList.add('hidden');
                error.classList.remove('hidden');
            }

            navigator.geolocation.watchPosition(function(geoposition) {
                loading.innerHTML = "Loading bus arrival data...";

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

                        error.classList.add('hidden');
                        loading.classList.add('hidden');

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

                        var now = moment();

                        lastUpdated.innerHTML = now.format('HH:mm:ss');
                        lastUpdatedTimeago.dataset.livestamp = now.unix();

                        accuracy.innerHTML = geoposition.coords.accuracy.toFixed(0);
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

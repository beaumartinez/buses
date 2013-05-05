requirejs.config({
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        },
        'underscore': {
            exports: '_'
        },
    },
});

require([
    'fastclick',
    'handlebars',
    'jquery',
    'moment',
    'underscore',
], function(FastClick, Handlebars, $, moment, _) {
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
            loading.innerHTML = "Loading bus arrival data..."

            $.ajax('/arrival-times/' + geoposition.coords.latitude + '/' + geoposition.coords.longitude + '/').done(function(responseArrivals) {
                if (responseArrivals.length == 0) {
                    var loading = document.getElementById('loading');
                    loading.innerHTML = "No bus arrival data. Are you in London?<p>TFL services might also be down.</p>"
                } else {
                    var stopLookup = _.groupBy(responseArrivals, 'stopId');
                    console.log(stopLookup);

                    var stopIds = Object.getOwnPropertyNames(stopLookup);
                    stopIds = stopIds.sort(function(a, b) {
                        var aExample = stopLookup[a][0];
                        var bExample = stopLookup[b][0];

                        var aKey = stopTitleTemplate({
                            exampleArrival: aExample,
                        });
                        var bKey = stopTitleTemplate({
                            exampleArrival: bExample,
                        });

                        return aKey.localeCompare(bKey);
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

                        var toggleAll = $('a[href=#toggle-all]')
                        toggleAll.parent().removeClass('hidden');
                    });
                }
            }).fail(function(response) {
                var loading = document.getElementById('loading');
                loading.innerHTML = "Couldn't load bus arrival data. Please try again later."
            });
        }, function(error) {
            var loading = document.getElementById('loading');
            loading.innerHTML = "Couldn't get location data."
        });

        $('body').on('click', function(event) {
            if (event.target.hash == '#toggle') {
                event.preventDefault();

                event.target.classList.toggle('toggled');
                $(event.target.parentNode).siblings().toggle();	
            }
        });
            
        $('a[href=#toggle-all]').click(function(event) {
            event.preventDefault();

            $('a[href=#toggle]').click();
        });
    });
})
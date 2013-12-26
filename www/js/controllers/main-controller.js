(function() {
    'use strict';

    window.buses.controller('mainController', ['$scope', '$http', function($scope, $http) {
        $scope.loading = 'Getting your location...';

        navigator.geolocation.watchPosition(function(geoposition) {
            $scope.loading = 'Getting arrivals...';

            $http.get('/arrival-times/' + geoposition.coords.latitude + '/' + geoposition.coords.longitude + '/').success(function(allArrivals) {
                // allArrivals is an array of all arrivals, ungrouped by bus stop and unsorted.
                // We need to group and sort them.

                $scope.loading = false;

                if (allArrivals.length === 0) {
                    $scope.error = "No bus arrival data. There might not be buses in your area. TFL services might also be down.";
                } else {
                    $scope.allArrivals = allArrivals;
                }

                $scope.accuracy = geoposition.coords.accuracy.toFixed(0);
            }).error(function(response) {
                $scope.error = (response.status === 502) ? "TFL services are down. " : "Couldn't load bus arrival data. ";
                $scope.error += "Please try again later.";
            });
        });

        $(function() {
            FastClick.attach(document.body);

            var hammer = Hammer(document.body, {
                drag_max_touches: 0,
            });

            hammer.on('drag', function(event) {
                // If we're pinching, stop the page from scrolling
                if (event.gesture.touches.length === 2) {
                    event.gesture.preventDefault();
                }
            });

            hammer.on('pinchin', function() {
                $('.stop-arrivals').addClass('hidden');
            });

            hammer.on('pinchout', function() {
                $('.stop-arrivals').removeClass('hidden');
            });
        });
    }]);
})();

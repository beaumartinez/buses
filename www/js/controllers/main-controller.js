'use strict';

app.controller('mainController', ['$scope', '$http', function($scope, $http) {
    navigator.geolocation.watchPosition(function(geoposition) {
        $http.get('/arrival-times/' + geoposition.coords.latitude + '/' + geoposition.coords.longitude + '/').success(function(allArrivals) {
            // allArrivals is an array of all arrivals, ungrouped by bus stop and unsorted.
            // We need to group and sort them.

            if (allArrivals.length === 0) {
                $scope.error = "No bus arrival data. There might not be buses in your area. TFL services might also be down.";
            } else {
                // Group by bus stop

                var stopLookup = _.groupBy(allArrivals, 'stopId');

                // Sort by distance

                var stopIds = Object.getOwnPropertyNames(stopLookup);

                stopIds = stopIds.sort(function(a, b) {
                    var aExample = stopLookup[a][0];
                    var bExample = stopLookup[b][0];

                    return aExample.distance - bExample.distance;
                });

                // Set $scope.stops

                $scope.stops = [];

                stopIds.forEach(function(stopId) {
                    var stopArrivals = stopLookup[stopId];

                    // Sort by ETA
                    stopArrivals = _.sortBy(stopArrivals, 'eta');

                    // Format ETAs nicely
                    stopArrivals.map(function(stopArrival) {
                        var eta = moment(stopArrival.eta);
                        eta = eta.fromNow(true);

                        stopArrival.eta = eta;

                        return stopArrival;
                    });

                    // Format distances nicely
                    stopArrivals.map(function(stopArrival) {
                        stopArrival.distance = stopArrival.distance * 1000;
                        stopArrival.distance = stopArrival.distance.toFixed(0);

                        return stopArrival;
                    });

                    var exampleArrival = stopArrivals[0];

                    $scope.stops.push({
                        stopName: exampleArrival.stopName,
                        stopCode: exampleArrival.stopCode,
                        towards: exampleArrival.towards,
                        distance: exampleArrival.distance,

                        arrivals: stopArrivals,
                    });
                });
            }

            $scope.accuracy = geoposition.coords.accuracy.toFixed(0);
        }).error(function(response) {
            $scope.error = (response.status === 502) ? "TFL services are down. " : "Couldn't load bus arrival data. ";
            $scope.error += "Please try again later.";
        });
    });
}]);

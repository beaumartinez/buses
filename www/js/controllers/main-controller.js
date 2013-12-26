(function() {
    'use strict';

    window.buses.controller('mainController', ['$scope', '$http', function($scope, $http) {
        $scope.loading = 'Getting your location...';

        navigator.geolocation.watchPosition(function(geoposition) {
            $scope.loading = 'Getting arrivals...';

            $http.get('/arrival-times/' + geoposition.coords.latitude + '/' + geoposition.coords.longitude + '/').success(function(allArrivals) {
                $scope.loading = false;

                $scope.allArrivals = allArrivals;
                $scope.accuracy = geoposition.coords.accuracy;

                if (allArrivals.length === 0) {
                    $scope.error = "No bus arrival data. There might not be buses in your area. TFL services might also be down.";
                }
            }).error(function(response) {
                $scope.error = (response.status === 502) ? "TFL services are down. " : "Couldn't load bus arrival data. ";
                $scope.error += "Please try again later.";
            });
        });
    }]);
})();

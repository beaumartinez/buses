(function() {
    'use strict';

    window.app.controller('mainController', ['$scope', '$http', function($scope, $http) {
        $scope.loading = 'Getting your location...';

        navigator.geolocation.watchPosition(function(geoposition) {
            $scope.loading = 'Loading bus stops...';
            $scope.accuracy = geoposition.coords.accuracy;

            var url = '/arrival-times/' + geoposition.coords.latitude + '/' + geoposition.coords.longitude + '/';
            $http.get(url).success(function(allArrivals) {
                $scope.loading = false;
                $scope.allArrivals = allArrivals;

                if (allArrivals.length === 0) {
                    $scope.error = "No bus stops. There might not be buses in your area.";
                }
            }).error(function(response) {
                $scope.error = (response.status === 502) ? "TFL " : "Our ";
                $scope.error += "services are down. Please try again later.";
            });
        }, function(geoposition) {
            $scope.error = "Couldn't get your location.";
        });
    }]);
})();

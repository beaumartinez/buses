(function() {
    'use strict';

    window.app.controller('main', ['$http', '$scope', '$window', function($http, $scope, $window) {
        $scope.loading = 'Getting your location...';

        $window.navigator.geolocation.getCurrentPosition(function(geoposition) {
            $scope.loading = 'Loading bus stops...';
            $scope.accuracy = geoposition.coords.accuracy;

            var url = '/arrival-times/' + geoposition.coords.latitude + '/' + geoposition.coords.longitude + '/';
            $http.get(url).success(function(allArrivals) {
                $scope.loading = false;
                $scope.error = false;

                $scope.allArrivals = allArrivals;

                if (allArrivals.length === 0) {
                    $scope.error = "No bus stops. There might not be buses in your area.";
                }
            }).error(function(response) {
                $scope.loading = false;

                $scope.error = (response.status === 502) ? "TFL " : "Our ";
                $scope.error += "services are down. Please try again later.";
            });
        }, function() {
            $scope.loading = false;

            $scope.error = "Couldn't get your location.";
        });
    }]);
})();

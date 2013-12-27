(function() {
    'use strict';

    window.app.controller('mainController', ['$scope', '$http', function($scope, $http) {
        $scope.loading = 'Getting your location...';

        navigator.geolocation.watchPosition(function(geoposition) {
            var url = '/arrival-times/' + geoposition.coords.latitude + '/' + geoposition.coords.longitude + '/';

            $scope.loading = 'Getting bus stops...';
            $http.get(url).success(function(allArrivals) {
                $scope.loading = false;

                $scope.allArrivals = allArrivals;
                $scope.accuracy = geoposition.coords.accuracy;

                if (allArrivals.length === 0) {
                    $scope.error = "No bus stops. There might not be buses in your area. TFL services might also be down.";
                }
            }).error(function(response) {
                $scope.error = (response.status === 502) ? "TFL " : "Our ";
                $scope.error += "services are down. Please try again later.";
            });
        });
    }]);
})();

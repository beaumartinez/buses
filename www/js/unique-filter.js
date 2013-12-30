(function() {
    window.app.filter('unique', ['$window', function($window) {
        return function(collection, key) {
            return $window._.uniq(collection, key);
        };
    }]);
})();

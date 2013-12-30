(function() {
    window.app.filter('timeago', ['$window', function($window) {
        return function(input) {
            return $window.moment(input).fromNow(true);
        };
    }]);
})();

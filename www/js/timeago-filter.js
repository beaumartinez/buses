(function() {
    window.buses.filter('timeago', function() {
        return function(input) {
            return moment(input).fromNow(true);
        };
    });
})();

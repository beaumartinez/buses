(function() {
    window.app.filter('timeago', function() {
        return function(input) {
            return moment(input).fromNow(true);
        };
    });
})();

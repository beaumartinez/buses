(function() {
    window.app.filter('unique', function() {
        return function(collection, key) {
            return _.uniq(collection, key);
        };
    });
})();

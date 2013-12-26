(function() {
    window.buses.filter('unique', function() {
        return function(collection, key) {
            return _.uniq(collection, key);
        };
    });
})();

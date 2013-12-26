(function() {
    'use strict';

    $(function() {
        FastClick.attach(document.body);

        var hammer = Hammer(document.body, {
            drag_max_touches: 0,
        });

        hammer.on('drag', function(event) {
            // If we're pinching, stop the page from scrolling
            if (event.gesture.touches.length === 2) {
                event.gesture.preventDefault();
            }
        });

        hammer.on('pinchin', function() {
            $('.stop-arrivals').addClass('hidden');
        });

        hammer.on('pinchout', function() {
            $('.stop-arrivals').removeClass('hidden');
        });
    });
})();

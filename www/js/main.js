(function() {
    'use strict';

    $(function() {
        window.setTimeout(function() {
            var spinner = $('.spinner');
            spinner.removeClass('hidden');
        }, 2000);

        function _error(message) {
            error.innerHTML = message;

            loading.parentNode.classList.add('hidden');
            error.classList.remove('hidden');
        }

        FastClick.attach(document.body);

        // Handlebars

        var stopTitleTemplate = document.getElementById('stop-title-template').innerHTML;
        Handlebars.registerPartial('stopTitleTemplate', stopTitleTemplate);

        stopTitleTemplate = Handlebars.compile(stopTitleTemplate);

        var arrivalTemplate = document.getElementById('arrival-template').innerHTML;
        Handlebars.registerPartial('arrivalTemplate', arrivalTemplate);

        var stopTemplate = document.getElementById('stop-template').innerHTML;
        stopTemplate = Handlebars.compile(stopTemplate);

        // Script
        
        var loading = document.getElementById('loading');
        var error = document.getElementById('error');

        var content = document.getElementById('content');

        var accuracy = document.getElementById('accuracy');

        var collapseAll = document.getElementById('collapse-all');

        $('body').on('click', '.stop', function(event) {
            event.preventDefault();

            $(event.target).parents('.stop').children('.stop-arrivals').toggleClass('hidden');
        });

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

        $('#collapse-all').click(function(event) {
            event.preventDefault();

            if ($('.stop-arrivals.hidden').length === $('.stop-arrivals').length) {
                $('.stop-arrivals.hidden').removeClass('hidden');
            } else {
                $('.stop-arrivals').addClass('hidden');
            }
        });
    });
})();

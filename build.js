({
    baseUrl: 'buses/static/',
    dir: 'buses/build',

    modules: [{
        name: 'main',
    }],

    paths: {
        fastclick: 'js/fastclick',
        ga: 'js/ga',
        handlebars: 'js/handlebars',
        jquery: 'js/jquery',
        main: 'js/main',
        moment: 'js/moment',
        underscore: 'js/underscore',
    },

    shim: {
        underscore: {
            exports: "_",
        },
        handlebars : {
            exports: "Handlebars",
        },
    }
})

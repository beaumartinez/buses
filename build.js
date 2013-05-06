({
    baseUrl: 'buses/static/js/',
    dir: 'buses/build',

    modules: [{
        name: 'main',
    }],

    shim: {
        underscore: {
            exports: "_",
        },
        handlebars : {
            exports: "Handlebars",
        },
    }
})

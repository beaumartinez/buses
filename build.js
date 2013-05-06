({
    baseUrl: 'buses/static/js',
    dir: 'buses/build/js',

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
    },

    removeCombined: true,
})

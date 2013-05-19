{
    baseUrl: 'buses/static/',
    dir: 'buses/build/',

    paths: {
        main: 'js/main',

        fastclick: 'js/fastclick',
        handlebars: 'js/handlebars',
        jquery: 'js/jquery',
        livestamp: 'js/livestamp',
        moment: 'js/moment',
        underscore: 'js/underscore',

        ga: 'js/ga',
    },

    modules: [{
        name: 'main',
    }],

    mainConfigFile: 'buses/static/js/main.js',

    removeCombined: true,

    preserveLicenseComments: false,

    optimizeCss: 'standard',
}

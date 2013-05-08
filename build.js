{
    baseUrl: 'buses/static/',
    dir: 'buses/build/',

    paths: {
        main: 'js/main',

        fastclick: 'js/fastclick',
        handlebars: 'js/handlebars',
        jquery: 'js/jquery',
        moment: 'js/moment',
        underscore: 'js/underscore',

        ga: 'js/ga',
    },

    modules: [{
        name: 'main',
    }],

    mainConfigFile: 'buses/static/js/main.js',

    removeCombined: true,

    optimizeCss: 'standard.keepComments',
}

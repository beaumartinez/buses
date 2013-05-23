{
    baseUrl: '../www/static/',
    dir: '../www/build/',

    paths: {
        main: 'js/main',

        fastclick: 'js/fastclick',
        hammer: 'js/hammer',
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

    mainConfigFile: '../www/static/js/main.js',

    removeCombined: true,

    preserveLicenseComments: false,

    optimizeCss: 'standard',
}

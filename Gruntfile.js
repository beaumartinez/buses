'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        bower: {
            install: {},
        },

        clean: {
            lib: ['lib'], 
            build: ['build'], 

            css: ['build/*.css'],
            js: ['build/*.js'],
            html: ['build/*.html'],
            images: ['build/images/*'],

            all: ['lib', 'build']
        },

        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['www/images/*'],
                        dest: 'build/images',
                    },
                ],
            },
        },

        cssmin: {
            css: {
                options: {
                    keepSpecialComments: 0,
                },

                // Include style.css at the end
                files: {
                    'build/style.css': [
                        'lib/**/*.css',

                        'www/css/*.css',

                        '!www/css/style.css',
                        'www/css/style.css',
                    ],
                }
            },
        },

        htmlmin: {
            html: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeOptionalTags: true,
                },

                expand: true,
                flatten: true,
                src: ['www/html/*.html'],
                dest: 'build/',
            },
        },

        uglify: {
            js: {
                files: {
                    // Include main.js and ga.js at the end
                    'build/main.js': [
                        'lib/**/*.js',
                        '!lib/**/bootstrap.js',

                        '!www/js/app.js',
                        'www/js/app.js',

                        'www/js/*.js',

                        '!www/js/main.js',
                        'www/js/main.js',
                    ],
                },
            },
        },

        watch: {
            js: {
                files: ['www/js/*.js'],
                tasks: ['clean:js', 'uglify', 'cacheBust'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['www/css/*.css'],
                tasks: ['clean:css', 'cssmin', 'cacheBust'],
                options: {
                    spawn: false,
                },
            },
            html: {
                files: ['www/html/*.html'],
                tasks: ['clean:html', 'htmlmin', 'cacheBust'],
                options: {
                    spawn: false,
                },
            },
            images: {
                files: ['www/images/*'],
                tasks: ['clean:images', 'copy:images'],
                options: {
                    spawn: false,
                },
            },
            bower: {
                files: ['bower.json'],
                tasks: ['clean:lib', 'bower', 'cssmin', 'uglify', 'cacheBust'],
                options: {
                    spawn: false,
                },
            }
        },

    cacheBust: {
        options: {
            algorithm: 'sha1',
        },
        assets: {
            files: [{
                src: ['build/index.html']
            }]
        }
    },
        
    });

    // End of config

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['clean:all', 'bower', 'htmlmin', 'copy', 'cssmin', 'uglify', 'cacheBust']);
};

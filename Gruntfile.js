'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            all: ['lib', 'prebuild', 'build'], 
            prebuild: ['prebuild'], 

            css: ['prebuild/*.css', 'build/*.css'],
            js: ['prebuild/*.js', 'build/*.js'],
            html: ['prebuild/*.html', 'build/*.html'],
        },

        bower: {
            install: {},
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

        copy: {
            bowerJs: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['lib/**/*.js', '!**/bootstrap.js'],
                        dest: 'prebuild/',
                        filter: 'isFile',
                    },
                ],
            },
            bowerCss: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['lib/**/*.css'],
                        dest: 'prebuild/',
                        filter: 'isFile',
                    },
                ],
            },
            js: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['www/js/*.js'],
                        dest: 'prebuild/',
                        filter: 'isFile',
                    },
                ],
            },
            css: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['www/css/*.css'],
                        dest: 'prebuild/',
                        filter: 'isFile',
                    },
                ],
            },
            images: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['www/images/*'],
                        dest: 'build/images/',
                        filter: 'isFile',
                    },
                ],
            },
        },

        uglify: {
            js: {
                files: {
                    // Include main.js and ga.js at the end
                    // Include controllers just before them
                    'build/main.js': [
                        'prebuild/*.js', 
                        '!prebuild/*-controller.js', 
                        'prebuild/*-controller.js', 
                        '!prebuild/main.js',
                        'prebuild/main.js',
                        '!prebuild/ga.js',
                        'prebuild/ga.js',
                    ],
                },
            },
        },

        cssmin: {
            css: {
                options: {
                    keepSpecialComments: 0,
                },
                files: {
                    // Include style.css at the end
                    'build/style.css': [
                        'prebuild/*.css',
                        '!prebuild/style.css',
                        'prebuild/style.css',
                    ],
                },
            },
        },

        watch: {
            js: {
                files: ['www/js/*.js'],
                tasks: ['watch-js'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['www/css/*.css'],
                tasks: ['watch-css'],
                options: {
                    spawn: false,
                },
            },
            html: {
                files: ['www/html/*.html'],
                tasks: ['watch-html'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    // End of config

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('watch-css', ['clean:css', 'copy:bowerCss', 'copy:css', 'cssmin']);
    grunt.registerTask('watch-js', ['clean:js', 'copy:bowerJs', 'copy:js', 'uglify']);
    grunt.registerTask('watch-html', ['clean:html', 'htmlmin']);

    grunt.registerTask('default', ['clean:all', 'bower', 'copy', 'htmlmin', 'cssmin', 'uglify']);
};

'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            pre: ['lib', 'prebuild', 'build'], 
            post: ['prebuild'], 

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
            bower: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['lib/**/*.js', '!**/bootstrap.js'],
                        dest: 'prebuild/js/',
                        filter: 'isFile',
                        rename: function(destination, source) {
                            if (source.indexOf('hammer') !== -1) {
                                return destination + 'hammer.js';
                            }
                            
                            if (source.indexOf('lodash') !== -1) {
                                return destination + 'lodash.js';
                            }

                            return destination + source; 
                        },
                    },
                    {
                        expand: true,
                        flatten: true, 
                        src: ['lib/**/*.css'],
                        dest: 'prebuild/css/',
                        filter: 'isFile',
                    },
                ],
            },
            js: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['www/js/*.js', 'www/js/**/*.js'],
                        dest: 'prebuild/js/',
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
                        dest: 'prebuild/css/',
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

        concat: {
            js: {
                // Include main.js and ga.js at the end
                // Include controllers just before them
                src: [
                    'prebuild/js/*.js', 
                    '!prebuild/*-controller.js',
                    'prebuild/*-controller.js',
                    '!prebuild/js/ga.js',
                    'prebuild/js/ga.js',
                ],
                dest: 'prebuild/js/main.js',
            },
            css: {
                // Include style.css at the end
                src: [
                    'prebuild/css/*.css',
                    '!**/style.css',
                    '**/style.css',
                ],
                dest: 'prebuild/css/style.css',
            },
        },

        uglify: {
            js: {
                files: {
                    'build/main.js': ['prebuild/js/main.js'],
                },
            },
        },

        cssmin: {
            css: {
                options: {
                    keepSpecialComments: 0,
                },
                files: {
                    'build/style.css': ['prebuild/css/style.css'],
                },
            },
        },

        watch: {
            js: {
                files: ['www/js/*.js', 'www/js/**/*.js'],
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

    grunt.registerTask('watch-css', ['clean:css', 'copy:css', 'concat:css', 'cssmin']);
    grunt.registerTask('watch-js', ['clean:js', 'copy:js', 'concat:js', 'uglify']);
    grunt.registerTask('watch-html', ['clean:html', 'htmlmin']);

    grunt.registerTask('default', ['clean:pre', 'bower', 'htmlmin', 'copy', 'concat', 'uglify', 'cssmin', 'clean:post']);
};

'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            pre: ['prebuild', 'build'], 
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
                src: ['www/html/*.html'],
                dest: 'build/html/',
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
                        src: ['www/js/*.js'],
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
                src: [
                    'prebuild/js/*.js', 
                    '!prebuild/js/main.js',
                    'prebuild/js/main.js',
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
                    'build/js/main.js': ['prebuild/js/main.js'],
                },
            },
        },

        cssmin: {
            css: {
                options: {
                    keepSpecialComments: 0,
                },
                files: {
                    'build/css/style.css': ['prebuild/css/style.css'],
                },
            },
        },

        watch: {
            js: {
                files: ['www/js/*.js'],
                tasks: ['copy-js'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['www/css/*.css'],
                tasks: ['copy-css'],
                options: {
                    spawn: false,
                },
            },
            html: {
                files: ['www/html/*.html'],
                tasks: ['copy-html'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('copy-css', ['clean:css', 'copy:css', 'concat:css', 'cssmin']);
    grunt.registerTask('copy-js', ['clean:js', 'copy:js', 'concat:js', 'uglify']);
    grunt.registerTask('copy-html', ['clean:html', 'copy:html', 'htmlmin']);

    grunt.registerTask('default', ['clean:pre', 'bower', 'htmlmin', 'copy', 'concat', 'uglify', 'cssmin']);
};

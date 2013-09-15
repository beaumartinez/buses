'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            pre: ['lib', 'www/prebuild', 'www/build'], 
            post: ['lib', 'www/prebuild'], 
        },

        bower: {
            install: {},
        },

        copy: {
            bower: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['lib/**/*.js', '!**/bootstrap.js'],
                        dest: 'www/prebuild/js/',
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
                        dest: 'www/prebuild/css/',
                        filter: 'isFile',
                    },
                ],
            },
            js: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['www/static/js/*.js'],
                        dest: 'www/prebuild/js/',
                        filter: 'isFile',
                    },
                ],
            },
            css: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['www/static/css/*.css'],
                        dest: 'www/prebuild/css/',
                        filter: 'isFile',
                    },
                ],
            },
            images: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['www/static/images/*'],
                        dest: 'www/build/images/',
                        filter: 'isFile',
                    },
                ],
            }
        },

        concat: {
            js: {
                // Include main.js and ga.js at the end
                src: [
                    'www/prebuild/js/*.js', 
                    '!**/main.js',
                    '**/main.js',
                    '!**/ga.js',
                    '**/ga.js',
                ],
                dest: 'www/prebuild/js/main.js',
            },
            css: {
                // Include style.css at the end
                src: [
                    'www/prebuild/css/*.css',
                    '!**/style.css',
                    '**/style.css',
                ],
                dest: 'www/prebuild/css/style.css',
            },
        },

        uglify: {
            js: {
                options: {
                    wrap: true,
                },
                files: {
                    'www/build/js/main.js': ['www/prebuild/js/main.js'],
                },
            },
        },

        cssmin: {
            css: {
                options: {
                    keepSpecialComments: 0,
                },
                files: {
                    'www/build/css/style.css': ['www/prebuild/css/style.css'],
                },
            },
        },

        watch: {
            js: {
                files: ['www/static/js/*.js'],
                tasks: ['copy-js'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['www/static/css/*.css'],
                tasks: ['copy-css'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('copy-css', ['copy:css', 'concat:css', 'cssmin']);
    grunt.registerTask('copy-js', ['copy:js', 'concat:js', 'uglify']);
    grunt.registerTask('default', ['clean:pre', 'bower', 'copy', 'concat', 'uglify', 'cssmin', 'clean:post']);
};

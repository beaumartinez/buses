'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        bower: {
            install: {
                cleanTargetDir: true,
            },
        },
        copy: {
            bower: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['lib/**/*.js'],
                        dest: 'www/prebuild/js/',
                        filter: 'isFile',
                        rename: function(destination, source) {
                            if (source.indexOf('hammer') !== -1) {
                                return destination + 'hammer.js';
                            } else {
                                return destination + source; 
                            }
                        },
                    },
                    {
                        expand: true,
                        flatten: true, 
                        src: ['lib/**/*.css'],
                        dest: 'www/prebuild/css/',
                        filter: 'isFile',
                    },
                ]
            },
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['www/static/js/*.js'],
                        dest: 'www/prebuild/js/',
                        filter: 'isFile',
                    },
                    {
                        expand: true,
                        flatten: true, 
                        src: ['www/static/css/*.css'],
                        dest: 'www/prebuild/css/',
                        filter: 'isFile',
                    },
                ]
            }
        },
        concat: {
            js: {
                src: ['www/prebuild/js/*.js', '!**/bootstrap.js'],
                dest: 'www/prebuild/js/main.js',
            },
            css: {
                src: 'www/prebuild/css/*.css',
                dest: 'www/prebuild/css/style.css',
            },
        },
        uglify: {
            js: {
                options: {
                    mangle: true,
                },
                files: {
                    'www/build/js/main.js': ['www/prebuild/js/main.js'],
                },
            },
        },
        cssmin: {
            main: {
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
                tasks: ['concat:js', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['www/static/css/*.css'],
                tasks: ['concat:css', 'cssmin'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['copy:main', 'concat', 'uglify', 'cssmin']);
    grunt.registerTask('bower-install', ['bower', 'copy:bower']);
};

'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        bower: {
            install: {
                cleanTargetDir: true,
            },
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        src: ['lib/**/*.js'],
                        dest: 'www/static/js/',
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
                        dest: 'www/static/css/',
                        filter: 'isFile',
                    },
                ]
            }
        },
        concat: {
            js: {
                src: ['www/static/js/*.js', '!**/bootstrap.js'],
                dest: 'www/build/js/main.js',
            },
            css: {
                src: 'www/static/css/*.css',
                dest: 'www/build/css/style.css',
            },
        },
        uglify: {
            main: {
                options: {
                    mangle: true,
                },
                files: {
                    'www/build/js/main.js': ['www/build/js/*.js'],
                },
            },
        },
        cssmin: {
            main: {
                options: {
                    keepSpecialComments: 0,
                },
                files: {
                    'www/build/css/style.css': ['www/build/css/*.css'],
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
    grunt.registerTask('bower-install', ['bower', 'copy']);
};

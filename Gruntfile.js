'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            pre: ['lib', 'prebuild', 'build'], 
            post: ['lib', 'prebuild'], 

            css: ['prebuild/*.css'],
            js: ['prebuild/*.js'],
            html: ['prebuild/*.html'],
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

                files: {
                    'build/html/index.html': 'www/html/index.html',
                },
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
        },
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('copy-css', ['clean:css', 'copy:css', 'concat:css', 'cssmin']);
    grunt.registerTask('copy-js', ['clean:js', 'copy:js', 'concat:js', 'uglify']);
    grunt.registerTask('default', ['clean:pre', 'bower', 'htmlmin', 'copy', 'concat', 'uglify', 'cssmin']);
};

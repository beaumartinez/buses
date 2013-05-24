'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        bower: {
            install: {
                cleanTargetDir: true
            }
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
                        }
                    },
                    {
                        expand: true,
                        flatten: true, 
                        src: ['lib/**/*.css'],
                        dest: 'www/static/css/',
                        filter: 'isFile'
                    },
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('default', ['bower', 'copy']);
};

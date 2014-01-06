module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
          dist: {
            options: {
                style: 'compressed'
            },
            files: {
                'css/style.css': 'scss/style.scss'
            }
          }
        },

        jshint: {
            beforeconcat: ['js/*.js']
        },

        concat: {
          dist: {
            src: [
                'js/libs/*.js',
                'js/scripts.js'
            ],
            dest: 'js/scripts.concat.js'
          }
        },

        uglify: {
            build: {
                src: 'js/scripts.concat.js',
                dest: 'js/scripts.min.js'
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['scss/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: './'
                }
            }
        },

    });

    require('load-grunt-tasks')(grunt);

    //grunt.registerTask('default', ['concat', 'uglify', 'sass', 'imagemin']);
    grunt.registerTask('dev', ['connect', 'watch']);

};
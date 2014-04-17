module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
          dist: {
            options: {
                style: 'expanded'
            },
            files: {
                'css/style.css': 'scss/style.scss'
            }
          }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 9']
            },
            single_file: {
                src: 'css/style.css',
                dest: 'css/style.prefixed.css'
            }
        },

        cssmin: {
            combine: {
                files: {
                    'css/style.min.css': ['css/style.prefixed.css']
                }
            }
        },

        jshint: {
            beforeconcat: ['js/scripts.js']
        },

        concat: {
          dist: {
            src: [
                'js/_libs/*.js',
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

        buildCSS: {
            tasks: ['sass', 'autoprefixer', 'cssmin']
        },

        buildJS: {
            tasks: ['jshint', 'concat', 'uglify']
        },

        // optimizeImages: {
        //     tasks: ['imagestuff']
        // },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['buildJS'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['scss/**/*.scss'],
                tasks: ['buildCSS'],
                options: {
                    spawn: false,
                }
            },
            files: {
                files: ['*.php']
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: './',
                }
            }
        },

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('buildCSS');
    grunt.registerTask('buildJS');
    //grunt.registerTask('optimizeImages');
    grunt.registerTask('build', ['buildCSS', 'buildJS'/*, 'optimizeImages'*/]);
    grunt.registerTask('dev', ['connect', 'watch']);

};
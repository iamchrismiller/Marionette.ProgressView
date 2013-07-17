  /*global module */
  module.exports = function(grunt) {
    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      clean : {
        build: {
          src: ["dest"]
        }
      },

      copy : {
        build: {
          files: [
            {
              expand: true,
              src: ['**'],
              dest: 'dist/',
              cwd: 'src/'
            },
          ]
        }
      },

      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        dist: {
          files: {
            'dist/marionette.progressview.min.js': ['src/marionette.progressview.js']
          }
        }
      },

      jshint: {
        files: ['src/**/*.js', 'test/**/*.js','!test/helper/**/*.js'],
        options : {
          jshintrc : './.jshintrc'
        }
      },

      jasmine          : {
        progress : {
          src     : [
            'vendor/jquery-1.8.2.js',
            'vendor/underscore.js',
            'vendor/backbone.min.js',
            'vendor/backbone.marionette.min.js',
            'src/marionette.progressview.js'
          ],
          options : {
            keepRunner : true,
            helpers : 'spec/helpers/*.js',
            specs   : [
              'spec/*Spec.js'
            ]
          }
        }
      },

      'jasmine-server' : {
        browser : true
      },

      watch            : {
        files : ['<config:jasmine.specs>', 'src/*js'],
        tasks : 'jasmine'
      },

      open : {
        dev : {
          url : 'http://127.0.0.1:8000/'
        }
      },

      connect: {
        server: {
          options: {
            port: 8000
          }
        }
      }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', 'dev');
    grunt.registerTask('dev', ['connect', 'open:dev', 'watch']);

    grunt.registerTask('test', 'jasmine');

    //no bueno
    grunt.registerTask('test-web', 'jasmine-server');

    grunt.registerTask('build', [
      'jshint',
      'jasmine',
      'clean',
      'copy',
      'uglify'
    ]);

  };
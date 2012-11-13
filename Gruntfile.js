module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg    : '<json:package.json>',
    meta   : {
      banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    concat: {
      dist: {
        src  : ['<banner:meta.banner>', 'src/marionette.progressview.js'],
        dest : 'dist/ProgressView.js'
      }
    },
    min    : {
      dist: {
        src  : ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest : 'dist/ProgressView.min.js'
      }
    },
    lint   : {
      src   : 'src/**/*.js',
      grunt : 'Gruntfile.js',
      tests : [
        'spec/**/*Spec.js'
      ]
    },
    jshint : {
      options : {
        curly   : true,
        eqeqeq  : true,
        immed   : true,
        latedef : true,
        newcap  : true,
        noarg   : true,
        sub     : true,
        undef   : true,
        boss    : true,
        eqnull  : true,
        node    : true,
        es5     : true
      },
      globals : {
        jQuery : true
      },
      grunt   : {
        options : {node : true},
        globals : {
          task     : true,
          config   : true,
          file     : true,
          log      : true,
          template : true
        }
      },
      src     : {
        options : {unused : false}
      },
      tests   : {
        globals : {
          jasmine    : false,
          describe   : false,
          beforeEach : false,
          expect     : false,
          it         : false,
          spyOn      : false,
          xit        : false
        }
      }
    },
    open : {
      dev : {
        url : 'http://127.0.0.1:8000/'
      }
    },
    watch            : {
      files : ['<config:jasmine.specs>', 'src/*js'],
      tasks : 'jasmine'
    },
    jasmine          : {
      src     : [
        'vendor/jquery-1.8.2.js',
        'vendor/underscore.js',
        'vendor/backbone.js',
        'vendor/marionette.core.js',
        'src/marionette.progressview.js'
      ],
      helpers : 'spec/helpers/*.js',
      specs   : [
        'spec/**/*Spec.js'
      ],
      timeout : 10000,
      server : {
        port : 2000
      }

    },
    'jasmine-server' : {
      browser : true
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-runner');
  grunt.loadNpmTasks('grunt-open');

  // Default task.
  grunt.registerTask('default', 'lint jasmine');
  grunt.registerTask('dev', 'server open:dev watch');
  grunt.registerTask('test', 'jasmine');
  grunt.registerTask('test-web', 'jasmine-server');
  grunt.registerTask('build', 'lint concat min jasmine');

  grunt.registerTask('build-notest', 'lint concat min');

};

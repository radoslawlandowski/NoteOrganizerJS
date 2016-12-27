module.exports = function(grunt) {

  var testTypes = grunt.option('testTypes') || 'all';
  var environment = grunt.option('environment') || 'development';

  var generalTestOptions = {
    reporter: 'mocha-junit-reporter',
    captureFile: 'test-results.xml',
    quiet: false,
    clearRequireCache: false,
    noFail: false
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env : {
      options : {
        //Shared Options Hash
      },
      dev : {
        NODE_ENV : grunt.option('environment') || 'development'
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: "node_modules", src: ['**'], dest: 'public/js/lib/'},
        ],
      },
    },

    clean: {
      public: ['public/js/lib/**']
    },

    mochaTest: {
      all: {
        options: generalTestOptions,
        src: ['test/**/*.js']
      },

      integration: {
        options: generalTestOptions,
        src: ['test/integration/**/*.js']
      },

      unit: {
        options: generalTestOptions,
        src: ['test/unit/**/*.js']
      },

      endtoend: {
        options: generalTestOptions,
        src: ['test/endtoend/**/*.js']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('default', ['env', 'clean', 'copy', 'mochaTest:' + testTypes]);
  grunt.registerTask('test', ['env', 'mochaTest:' + testTypes])

};

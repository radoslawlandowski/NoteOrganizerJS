module.exports = function(grunt) {

var testsFolderPath;


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
        options: {
          reporter: 'mocha-junit-reporter',
          captureFile: 'test-results.xml',
          quiet: false,
          clearRequireCache: false,
          noFail: false
        },
        src: ['test/**/*.js']
      },

      integration: {
        options: {
          reporter: 'mocha-junit-reporter',
          captureFile: 'test-results.xml',
          quiet: false,
          clearRequireCache: false,
          noFail: false
        },
        src: ['test/integration/**/*.js']
      },

      unit: {
        options: {
          reporter: 'mocha-junit-reporter',
          captureFile: 'test-results.xml',
          quiet: false,
          clearRequireCache: false,
          noFail: false
        },
        src: ['test/unit/**/*.js']
      },

      endtoend: {
        options: {
          reporter: 'mocha-junit-reporter',
          captureFile: 'test-results.xml',
          quiet: false,
          clearRequireCache: false,
          noFail: false
        },
        src: ['test/endtoend/**/*.js']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-npm-install');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');


  var testTypes = grunt.option('testTypes') || 'all';
  var environment = grunt.option('environment') || 'development';

  grunt.registerTask('default', ['env', 'clean', 'npm-install', 'copy', 'mochaTest:' + testTypes]);
  grunt.registerTask('test', ['env', 'mochaTest:' + testTypes])

};

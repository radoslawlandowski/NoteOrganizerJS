module.exports = function(grunt) {

  var testTypes = grunt.option('testTypes') || 'unit';
  var environment = grunt.option('environment') || 'testing';

  var generalTestOptions = {
    reporter: grunt.option('testReporter') || 'spec',
    captureFile: '',
    quiet: false,
    clearRequireCache: true,
    noFail: false
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env : {
      options : {
        //Shared Options Hash
      },
      dev : {
        NODE_ENV : grunt.option('environment') || 'testing'
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: "node_modules", src: ['**'], dest: 'public/js/lib/'},
        ],
      },
      testResult: {
        files: [
          {expand: true, src: "test-results.xml", dest: "testResults/"}
        ]
      }
    },

    clean: {
      public: ['public/js/lib/**'],
      testResult: ['test-results.xml'],
      testResultDirectory: ['testResults/*']
    },

    mochaTest: {
      integration: {
        options: generalTestOptions,
        src: ['test/integration/**/*.js']
      },

      unit: {
        options: generalTestOptions,
        src: ['test/unit/**/*.js']
      },

      all: {
        options: generalTestOptions,
        src: ['test/unit/**/*.js', 'test/integration/**/*.js']
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('runTest', ['env', 'mochaTest:' + testTypes]);
  grunt.registerTask('testResultMover', ['copy:testResult', 'clean:testResult']);

  grunt.registerTask('test', ['runTest', 'testResultMover']);
  grunt.registerTask('default', ['env', 'clean:public', 'copy:main', 'test']);


};

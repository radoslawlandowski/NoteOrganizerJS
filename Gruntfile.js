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
          {expand: true, src: "*.xml", dest: "testResults/"}
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

    run: {
      startServer: {
        options: {
          wait: false,
          ready: /Successfully connected to database: NoteOrganizer_*/
        },
        cmd: 'npm',
        args: [
          'start'
        ]
      },
      stopServer: {
        options: {
          wait: true
        },
        cmd: 'fuser',
        args: [
          '-k',
          '3000/tcp'
        ]
      }
    },

    protractor: {
      options: {
        configFile: "node_modules/protractor/example/conf.js", // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      test: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
        options: {
          configFile: "test/e2e/conf.js", // Target-specific config file
          args: {} // Target-specific arguments
        }
      }
    },

    karma: {
      all: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('runTest', ['env', 'mochaTest:' + testTypes]);
  grunt.registerTask('testResultMover', ['copy:testResult', 'clean:testResult']);

  grunt.registerTask('test', ['runTest', 'testResultMover']);
  grunt.registerTask('start', ['env', 'run:startServer']);
  grunt.registerTask('default', ['env', 'clean:public', 'copy:main']);
  grunt.registerTask('test-e2e', ['start', 'protractor:test', 'run:stopServer']);


};

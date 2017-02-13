// Karma configuration
// Generated on Fri Dec 30 2016 18:16:11 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'public/js/',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['requirejs', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../../test-main.js',
      'lib/angular/angular.js',
      {pattern: 'lib/angular-mocks/angular-mocks.js', included: false},
      {pattern: 'lib/angular-ui-router/release/angular-ui-router.js', included: false},
      'lib/angular-cookies/angular-cookies.js',
      'lib/requirejs/require.js',
      'lib/karma-require.js',
      'lib/angular-bootstrap/ui-bootstrap.js',
      'lib/angular-bootstrap/ui-bootstrap-tpls.js',
      //'lib/angular-animate/angular-animate.min.js',
      //'lib/angular-animate/angular-animate.min.js.map',
      'lib/angular-filter/dist/angular-filter.min.js',
      {pattern: 'lib/ng-dialog/js/ngDialog.js', included: false},
      'lib/angular-growl-notifications/dist/angular-growl-notifications.js',
      'application/directives/FilterBar.html.js',
      {pattern: 'application/NoteOrganizerModule.js', included: false},
      {pattern: "test/**/*.js", included: false},
      {pattern: "application/**/*.js", included: false},
      'application/directives/FilterBar.html',
    ],


    // list of files to exclude
    exclude: [
      '/lib/chai-http/',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'application/directives/FilterBar.html': ['ng-html2js']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['junit', 'spec'],

    junitReporter: {
      outputDir: '../../testResults', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'client-test-results.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: 'ClientTest', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {} // key value pair of properties to add to the <properties> section of the report
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'public/',
      prependPrefix: 'js/',


      // - setting this option will create only a single module that contains templates
      //   from all the files, so you can load them all with module('foo')
      // - you may provide a function(htmlPath, originalPath) instead of a string
      //   if you'd like to generate modules dynamically
      //   htmlPath is a originalPath stripped and/or prepended
      //   with all provided suffixes and prefixes
      moduleName: 'htmlTemplates'
    }
  })
}

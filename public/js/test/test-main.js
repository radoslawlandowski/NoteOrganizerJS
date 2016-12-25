var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule)
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',
  paths: {
      'angular': 'lib/angular/angular',
      'angularMocks': 'lib/angular-mocks/angular-mocks',
      'uiRouter': 'lib/angular-ui-router/release/angular-ui-router',
      'ngCookies': 'lib/angular-cookies/angular-cookies',
      'requireJS': 'lib/requirejs/require',
      'karma-requireJS': 'lib/karma-require',
      'uiBootstrap': 'lib/angular-bootstrap/ui-bootstrap',
      'uiBootstrapTemplates' : 'lib/angular-bootstrap/ui-bootstrap-tpls',
      'ngAnimate': 'lib/angular-animate/angular-animate.min',
      'angular-filter': 'lib/angular-filter/dist/angular-filter.min',
      'ng-dialog' : 'lib/ng-dialog/js/ngDialog',
      'angular-growl-notifications': 'lib/angular-growl-notifications/dist/angular-growl-notifications',
      'htmlTemplates': 'application/directives/FilterBar.html'
  },
  shim: {
      'angular': {
          exports: 'angular'
      },
      'angularMocks': ['angular'],
      'uiRouter' : ['angular'],
      'ngCookies': ['angular'],
      'uiBootstrap' : {
          deps: ['angular', 'uiBootstrapTemplates']
      },
      'uiBootstrapTemplates' : {
          deps: ['angular']
      },
      'ngAnimate' : {
          deps: ['angular']
      },
      'angular-filter' : {
          deps: ['angular']
      },
      'ng-dialog' : {
          deps: ['angular']
      },
      'angular-growl-notifications': {
          deps: ['angular']
      },
      'htmlTemplates' : {
          exports: 'htmlTemplates',
          deps: ['angular']
      }
  },
  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});

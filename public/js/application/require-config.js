'use strict';

//noinspection JSFileReferences
require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router',
        'ngCookies': 'lib/angular-cookies/angular-cookies',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng',
        'highstocks': 'lib/highcharts/highstock',
        'uiBootstrap': 'lib/angular-ui-bootstrap/dist/ui-bootstrap',
        'uiBootstrapTemplates' : 'lib/angular-ui-bootstrap/dist/ui-bootstrap-tpls',
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
        'uiRouter' : ['angular'],
        'ngCookies': {
            exports: 'ngCookies',
            deps: ['angular']
        },
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
            deps: ['angular']
        }
    },
    deps: ['application/bootstrap']
});

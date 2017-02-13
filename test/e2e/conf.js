exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],

    allScriptsTimeout: 60000,

    onPrepare: function() {
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: 'testResults',
            filePrefix: 'e2e-test-results'
        }));
    },

    jasmineNodeOpts: {
      showColors: true
    },
}

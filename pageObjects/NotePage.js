'use strict';

var NotePage = function () {
  browser.get('http://localhost:3000/#!/main');
};

 NotePage.prototype = Object.create({}, {
    bigHeading: { get: function () { return element(by.id('bigHeading')); }},
    description: { get: function () { return element(by.id('description')); }},
});

module.exports = NotePage;

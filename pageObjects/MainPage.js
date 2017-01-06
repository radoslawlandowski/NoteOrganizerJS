'use strict';

var MainPage = function () {
  browser.get('http://localhost:3000/#!/main');
};

 MainPage.prototype = Object.create({}, {
    bigHeading: { get: function () { return element(by.id('bigHeading')); }},
    description: { get: function () { return element(by.id('description')); }},
});

module.exports = MainPage;

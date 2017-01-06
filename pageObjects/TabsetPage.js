'use strict';

var tabNameOne = "one";
var tabNameTwo = "two";

var tabIdPattern = "tabset-tab-";

var TabsetPage = function () {
};

 TabsetPage.prototype = Object.create({}, {
    tabOne: { get: function () { return element(by.id(tabIdPattern + tabNameOne)); }},
    tabTwo: { get: function () { return element(by.id(tabIdPattern + tabNameTwo)); }},
});

module.exports = TabsetPage;

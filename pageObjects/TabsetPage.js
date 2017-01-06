'use strict';

var tabSet = "tabset";

var tabIdPattern = "tabset-tab-";
var tabNameOne = tabIdPattern + "one";
var tabNameTwo = tabIdPattern + "two";

var TabsetPage = function () {
};

 TabsetPage.prototype = Object.create({}, {
    tabSet: { get: function () { return element(by.id(tabSet)); }},
    tabOne: { get: function () { return element(by.id(tabNameOne)); }},
    tabTwo: { get: function () { return element(by.id(tabNameTwo)); }},
});

module.exports = TabsetPage;

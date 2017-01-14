'use strict';

function TabsetPage() {
  this.tabsetId = "tabset";
  this.tabOneId = "tabset-tab-one";
  this.tabTwoId = "tabset-tab-two";
  this.newTabButtonId = "newTabButton";
  this.deleteTabButtonId = "deleteTabButton";
};

function _getTabset(id) {
  return element(by.id(id));
};

function _getTabs(id) {
  return _getTabset(id).all(by.css("[id^=tabset-tab-]"));
};

function _getNewTabButton() {
  return element(by.id(this.newTabButtonId));
};

function _isDisplayed(id) {
  return _getTabset(this.tabsetId).element(by.id(id)).isDisplayed().then(function(condition) {
    return condition;
  }).then(function(success) {
    return true;
  }, function (error) {
    console.log('A NoSuchElement exception was throw because the element is NOT displayed so false is returned');
    return false;
  });
};

TabsetPage.prototype.getTabset = function() {
 return _getTabset(this.tabsetId);
};

TabsetPage.prototype.createNewTab = function() {
 return _getNewTabButton().click();
};

TabsetPage.prototype.getTabs = function() {
  return _getTabs(this.tabsetId);
};

TabsetPage.prototype.getTabsCount = function() {
  return _getTabs(this.tabsetId).count();
};

TabsetPage.prototype.getTabNames = function() {
  return _getTabs(this.tabsetId).map(function (elm) {
    return elm.getText().then(function(result) {
      return result;
    });
  });
};

TabsetPage.prototype.getTab = function(name) {
  return _getTabset(this.tabsetId).element(by.css("[id^=tabset-tab-" + name + "]"));
};

TabsetPage.prototype.getDeleteTabButton = function(name) {
  return _getTabset(this.tabsetId).element(by.css("[id^=tabset-tab-" + name + "]")).element(by.id(this.deleteTabButtonId));
};

TabsetPage.prototype.isNewTabButtonVisible = function() {
 return _isDisplayed(this.newTabButtonId); // todo
};

TabsetPage.prototype.tabDisplayed = function(name) {
  return _getTabset(this.tabsetId).element(by.css("[id^=tabset-tab-" + name +"]")).isDisplayed().then(function(condition) {
    return condition;
  }).then(function(success) {
    return true;
  }, function (error) {
    console.log('A NoSuchElement exception was throw because the element is NOT displayed so false is returned');
    return false;
  });
};

module.exports = TabsetPage;

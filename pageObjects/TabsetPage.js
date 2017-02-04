'use strict';

function TabsetPage() {
  var tabsetId = "tabset";

  var newTabButtonId = "newTabButton";
  var newNoteButtonId = "newNoteButton";
  var deleteTabButtonId = "deleteTabButton";
  var allTabsCssPattern = "[id^=tabset-tab-]";
  var tabCss = "[id^=tabset-tab-{name}]";

  this.getTabset = function() {
   return _getTabset();
  };

  this.getTabs = function() {
    return _getTabs();
  };

  this.getTabsCount = function() {
    return _getTabs().count();
  };

  this.getTabNames = function() {
    return _getTabs().map(function (elm) {
      return elm.getText().then(function(result) {
        return result;
      });
    });
  };

  this.getTab = function(name) {
    return _getTab(name);
  };

  this.createNewTab = function() {
   return _getNewTabButton().click();
  };

  this.clickNewNoteButton = function(tab) {
    return element(by.id(newNoteButtonId)).click();
  };

  this.getDeleteTabButton = function(name) {
    return _getTab(name).element(by.id(deleteTabButtonId));
  };

  this.isNewTabButtonVisible = function() {
   return _isDisplayed(newTabButtonId); // todo
  };

  this.tabDisplayed = function(name) {
    return _getTab(name).isDisplayed().then(function(condition) {
      return condition;
    }).then(function(success) {
      return true;
    }, function (error) {
      console.log('A NoSuchElement exception was throw because the element is NOT displayed so false is returned');
      return false;
    });
  };

  function _getTabset() {
    return element(by.id(tabsetId));
  };

  function _getTabs() {
    return _getTabset().all(by.css(allTabsCssPattern));
  };

  function _getTab(name) {
    return _getTabset().element(by.css(_prepareTabCss(name)));
  };

  function _getNewTabButton() {
    return element(by.id(newTabButtonId));
  };

  function _prepareTabCss(name) {
    return tabCss.replace("{name}", name);
  };

  function _isDisplayed(id) {
    return _getTabset().element(by.id(id)).isDisplayed().then(function(condition) {
      return condition;
    }).then(function(success) {
      return true;
    }, function (error) {
      console.log('A NoSuchElement exception was throw because the element is NOT displayed so false is returned');
      return false;
    });
  };
};

module.exports = TabsetPage;

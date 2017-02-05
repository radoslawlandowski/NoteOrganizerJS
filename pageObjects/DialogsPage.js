'use strict';

function Dialog () {
  var prefix = "dialog-";
  var confirmButtonId = prefix + "confirm";
  var cancelButtonId = prefix + "cancel";
  var inputId = prefix + "input";
  var titleId = prefix + "title";
  var firstHeaderId = prefix + "firstHeader";
  var secondHeaderId = prefix + "secondHeader";

  function clickButton(button) {
    element(by.id(button)).click();
  };

  function getText(textId) {
    return element(by.id(textId)).getText();
  };

  this.confirmDialog = function() {
    clickButton(confirmButtonId);
  };

  this.cancelDialog = function() {
    clickButton(cancelButtonId);
  };

  this.getTitle = function() {
    return getText(titleId);
  };

  this.getFirstHeader = function() {
    return getText(firstHeaderId);
  };

  this.getSecondHeader = function() {
    return getText(secondHeaderId);
  };

  this.fillInput = function(input) {
    element(by.id(inputId)).sendKeys(input);
  };

  this.inputDisplayed = function() {
    return element(by.id(inputId)).isDisplayed().then(function(condition) {
      return condition;
    }).then(function(success) {
      return true;
    }, function (error) {
      console.log('A NoSuchElement exception was throw because the element is NOT displayed so false is returned');
      return false;
    });
  };
};

module.exports = Dialog;

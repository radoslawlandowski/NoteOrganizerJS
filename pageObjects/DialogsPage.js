'use strict';

function Dialog () {
  this._prefix = "dialog-";
  this._confirmButtonId = this._prefix + "confirm";
  this.__cancelButtonId = this._prefix + "cancel";
  this._inputId = this._prefix + "input";
  this._titleId = this._prefix + "title";
  this._firstHeaderId = this._prefix + "firstHeader";
  this._secondHeaderId = this._prefix + "secondHeader";
};

function clickButton(button) {
  element(by.id(button)).click();
};

function getText(textId) {
  return element(by.id(textId)).getText();
};

Dialog.prototype.confirmDialog = function() {
  clickButton(this._confirmButtonId);
};

Dialog.prototype.cancelDialog = function() {
  clickButton(this._cancelButtonId);
};

Dialog.prototype.getTitle = function() {
  return getText(this._titleId);
};

Dialog.prototype.getFirstHeader = function() {
  return getText(this._firstHeaderId);
};

Dialog.prototype.getSecondHeader = function() {
  return getText(this._secondHeaderId);
};

Dialog.prototype.fillInput = function(input) {
  element(by.id(this._inputId)).sendKeys(input);
};

Dialog.prototype.inputDisplayed = function() {
  return element(by.id(this._inputId)).isDisplayed().then(function(condition) {
    return condition;
  }).then(function(success) {
    return true;
  }, function (error) {
    console.log('A NoSuchElement exception was throw because the element is NOT displayed so false is returned');
    return false;
  });
};

module.exports = Dialog;

'use strict';

function Notification() {
  var notificationId = "notification-popup";

  function getNotification() {
    return element(by.id(notificationId));
  };

  this.getText = function() {
    return getNotification().getText();
  };

  this.getType = function() {
    return getNotification().getAttribute('class');
  };

  this.isDisplayed = function() {
    return element(by.id(notificationId)).isDisplayed().then(function(condition) {
      return condition;
    }).then(function(success) {
      return true;
    }, function (error) {
      console.log('A NoSuchElement exception was throw because the element is NOT displayed so false is returned');
      return false;
    });
  };
};

module.exports = Notification;

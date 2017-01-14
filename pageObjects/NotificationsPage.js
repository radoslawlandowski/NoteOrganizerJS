'use strict';

function Notification() {
  this.notificationId = "notification-popup";
};

function getNotification(notificationId) {
  return element(by.id(notificationId));
};

Notification.prototype.getText = function() {
  return getNotification(this.notificationId).getText();
};

Notification.prototype.getType = function() {
  return getNotification(this.notificationId).getAttribute('class');
};

module.exports = Notification;

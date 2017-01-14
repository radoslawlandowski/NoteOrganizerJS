var TestHelper = require('../TestHelper');

var MainPage = require('../../pageObjects/MainPage');
var TabsetPage = require('../../pageObjects/TabsetPage');
var Dialog = require('../../pageObjects/DialogsPage');
var Notification = require('../../pageObjects/NotificationsPage');

var mainPage, tabsetPage, dialog, notification;

describe('NoteOrganizer E2E Testing', function() {

  beforeAll(function() {
    TestHelper.clearCollection();
    TestHelper.populateCollection();
  });

  beforeEach(function() {
      mainPage = new MainPage();
      tabsetPage = new TabsetPage();
      dialog = new Dialog();
      notification = new Notification();
  });
/*
  describe('Static data', function() {
      it('should be correct', function() {
        expect(browser.driver.getTitle()).toEqual('Note Organizer!');
        expect(mainPage.bigHeading.getText()).toEqual("Note organizer!");
        expect(mainPage.description.getText()).toEqual("A very simple application for creating, storing and viewing your notes!");
      });
  });

  describe('New tab', function() {
      it('should be correct', function() {
        tabsetPage.createNewTab();
        expect(dialog.getFirstHeader()).toEqual("Enter the title of your new tab");
        expect(dialog.getSecondHeader()).toEqual("");
        dialog.fillInput("5");
        dialog.confirmDialog();
        expect(notification.getText()).toEqual("The tab has been created");
        expect(notification.getType()).toContain("notificationSuccess");

        tabsetPage.getTab("5").click();
        browser.driver.sleep(2000);
        tabsetPage.getTab("0000021").click();
        browser.driver.sleep(2000);
        tabsetPage.getTab("5").click();
        browser.driver.sleep(2000);


        expect(tabsetPage.tabDisplayed("5")).toEqual(true);
      });
  });
*/
  describe('Deleting tab', function() {
      it('should be correct', function() {
        tabsetPage.getTab("5").click();
        tabsetPage.getDeleteTabButton("5").click();

        expect(dialog.getFirstHeader()).toEqual("Are you sure you want to delete this tab?");
        expect(dialog.getSecondHeader()).toEqual("The notes associated with it will also be deleted!");
        expect(dialog.inputDisplayed()).toEqual(false);

        dialog.confirmDialog();
        expect(notification.getText()).toEqual("The tab has been deleted");
        expect(notification.getType()).toContain("notificationSuccess");
        expect(tabsetPage.tabDisplayed("5")).toEqual(false);

        browser.driver.sleep(2000);
      });
  });
  /*

  describe('Clicking on a tab', function() {
      it('should change active tab', function() {
        tabsetPage.tabSet.all(by.repeater('note in notes')).count().then(function(count){console.log(count);});

        tabsetPage.tabSet.element(by.id('note-one-0')).element(by.id('contentInput')).getAttribute('value').then(function(attr) {
          console.log(attr);
        });

      expect(tabsetPage.tabOne.all(by.repeater('note in notes')).count()).toEqual(3);
        browser.driver.sleep(300);
        tabsetPage.tabTwo.click();
        tabsetPage.tabTwo.all(by.repeater('note in notes')).count().then(function(count) {
          expect(count).toEqual(0);
        });
      });
  });*/
});

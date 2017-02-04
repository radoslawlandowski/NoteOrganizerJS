var TestHelper = require('../TestHelper');

var MainPage = require('../../pageObjects/MainPage');
var TabsetPage = require('../../pageObjects/TabsetPage');
var Dialog = require('../../pageObjects/DialogsPage');
var Notification = require('../../pageObjects/NotificationsPage');
var Note = require('../../pageObjects/NotePage');

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
      note = new Note();
  });

  describe('Static data', function() {
      it('should be correct', function() {
        expect(browser.driver.getTitle()).toEqual('Note Organizer!');
        expect(mainPage.bigHeading.getText()).toEqual("Note organizer!");
        expect(mainPage.description.getText()).toEqual("A very simple application for creating, storing and viewing your notes!");
      });
  });

  describe('When creating note', function() {
      it('it should be present under correct tab', function() {
        var title = "noteTitle";
        var content = "noteContent";
        var tab = "one";

        tabsetPage.clickNewNoteButton(tab);
        var n = note.getNewNote(tab);
        expect(note.getTab(n)).toEqual(tab);

        note.enterTitle(n, title);
        note.enterContent(n, content);
        note.confirmNote(n);

        expect(notification.getType()).toContain("notificationSuccess");
        expect(notification.getText()).toEqual("The note has been created");

        n = note.getNote(tab, title);
        expect(note.getTitle(n)).toEqual(title);
        expect(note.getTab(n)).toEqual(tab);
        expect(note.getContent(n)).toEqual(content);
      });
  });

  describe('When creating new tab', function() {
      it('and confirming it should appear in the tabset', function() {
        var tabTitle = "newTab";

        tabsetPage.createNewTab();
        expect(dialog.getFirstHeader()).toEqual("Enter the title of your new tab");
        expect(dialog.getSecondHeader()).toEqual("");

        dialog.fillInput(tabTitle);
        dialog.confirmDialog();
        expect(notification.getText()).toEqual("The tab has been created");
        expect(notification.getType()).toContain("notificationSuccess");

        expect(tabsetPage.tabDisplayed(tabTitle)).toEqual(true);
      });

      it('and canceling it should not appear in the tabset', function() {
        var tabTitle = "000";
        expect(tabsetPage.tabDisplayed(tabTitle)).toEqual(false);

        tabsetPage.createNewTab();
        expect(dialog.getFirstHeader()).toEqual("Enter the title of your new tab");
        expect(dialog.getSecondHeader()).toEqual("");

        dialog.fillInput(tabTitle);
        dialog.cancelDialog();
        expect(notification.isDisplayed()).toEqual(false);
        expect(tabsetPage.tabDisplayed(tabTitle)).toEqual(false);
      });
  });

  describe('When deleteing the tab', function() {
      it('and canceling it should not disappear from the tabset', function() {
        var tabName = "one";

        expect(tabsetPage.tabDisplayed(tabName)).toEqual(true);

        tabsetPage.getTab(tabName).click();
        tabsetPage.getDeleteTabButton(tabName).click();

        expect(dialog.getFirstHeader()).toEqual("Are you sure you want to delete this tab?");
        expect(dialog.getSecondHeader()).toEqual("The notes associated with it will also be deleted!");
        expect(dialog.inputDisplayed()).toEqual(false);

        dialog.cancelDialog();
        expect(notification.isDisplayed()).toEqual(false);
        expect(tabsetPage.tabDisplayed(tabName)).toEqual(true);
      });

      it('and confirming it should disappear from the tabset', function() {
        var tabName = "one";

        expect(tabsetPage.tabDisplayed(tabName)).toEqual(true);

        tabsetPage.getTab(tabName).click();
        tabsetPage.getDeleteTabButton(tabName).click();

        expect(dialog.getFirstHeader()).toEqual("Are you sure you want to delete this tab?");
        expect(dialog.getSecondHeader()).toEqual("The notes associated with it will also be deleted!");
        expect(dialog.inputDisplayed()).toEqual(false);

        dialog.confirmDialog();
        expect(notification.isDisplayed()).toEqual(true);
        expect(tabsetPage.tabDisplayed(tabName)).toEqual(false);
      });
  });
});

var MainPage = require('../../pageObjects/MainPage');
var TabsetPage = require('../../pageObjects/TabsetPage');

var mainPage, tabsetPage;

describe('NoteOrganizer E2E Testing', function() {
  beforeEach(function() {
      mainPage = new MainPage();
      tabsetPage = new TabsetPage();
  });
/*
  describe('Static data', function() {
      it('should be correct', function() {
        expect(browser.driver.getTitle()).toEqual('Note Organizer!');
        expect(mainPage.bigHeading.getText()).toEqual("Note organizer!");
        expect(mainPage.description.getText()).toEqual("A very simple application for creating, storing and viewing your notes!");
      });
  });
*/
  describe('New tab', function() {
      it('should be correct', function() {
        tabsetPage.newTabButton.click();
        element(by.id("dialog-New tab")).element(by.id("New tab-input")).sendKeys('rrrr');
        element(by.id("New tab-confirm")).click();
        element(by.id("notification-popup")).getText().then(function(attr) {
          expect(attr).toEqual("The tab has been created");
        });
      });
  });
 /*
  describe('Amount of notes in first tab', function() {
      it('should be correct', function() {
        element.all(by.repeater('note in notes')).count().then(function(count) {
          expect(count).toEqual(3);
        });
      });
  });

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

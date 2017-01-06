var MainPage = require('../../pageObjects/MainPage');
var TabsetPage = require('../../pageObjects/TabsetPage');

var mainPage, tabsetPage;

describe('NoteOrganizer E2E Testing', function() {
  beforeEach(function() {
      mainPage = new MainPage();
      tabsetPage = new TabsetPage();
  });

  describe('Static data', function() {
      it('should be correct', function() {
        expect(browser.driver.getTitle()).toEqual('Note Organizer!');
        expect(mainPage.bigHeading.getText()).toEqual("Note organizer!");
        expect(mainPage.description.getText()).toEqual("A very simple application for creating, storing and viewing your notes!");
      });
  });

  describe('Clicking tabs', function() {
      it('should be correct', function() {

      });
  });
});

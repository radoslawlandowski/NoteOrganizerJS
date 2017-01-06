var MainPage = require('../../pageObjects/MainPage');
var TabsetPage = require('../../pageObjects/TabsetPage');

var mainPage, tabsetPage;

describe('E2E Testing', function() {
  beforeEach(function() {
      mainPage = new MainPage();
      tabsetPage = new TabsetPage();
  });

  describe('Protractor Demo App', function() {
      it('should have a title', function() {
          browser.driver.sleep(3000);
          expect(mainPage.bigHeading.getText()).toEqual("Note organizer!");
  /*
          expect(browser.driver.getTitle()).toEqual('Note Organizer!');
          browser.driver.sleep(1000);

          expect(element(by.id('bigHeading')).getText()).toEqual("Note organizer!");
          expect(element(by.id('description')).getText()).toEqual("A very simple application for creating, storing and viewing your notes!");

          element(by.id('newNoteButton')).click();*/
        //f  browser.driver.sleep(4000);

      });
  });
});

describe('Protractor Demo App', function() {
    it('should have a title', function() {
        browser.driver.get('http://localhost:9000/#/main');

        expect(browser.driver.getTitle()).toEqual('Note Organizer!');
        browser.driver.sleep(1000);
        expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:9000/auth#/login');
        element(by.id('username')).sendKeys('a');
        element(by.id('password')).sendKeys('a');
        element(by.id('loginButton')).click();
        browser.driver.sleep(1000);
        expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:9000/');
        browser.driver.get('http://localhost:9000/#/main');
        browser.driver.sleep(500);
        expect(element(by.id('bigHeading')).getText()).toEqual("Note organizer!");
        expect(element(by.id('description')).getText()).toEqual("A very simple application for creating, storing and viewing your notes!");
        browser.driver.sleep(4000);

    });
});
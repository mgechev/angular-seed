describe('Login', () => {

    beforeEach(() => {
        browser.get('/Login');
    });
    it('should login with valid UserName and Password', () => {
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click(); return browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return '/App';
            });
        }, 10000);
    });

    it('should not login with invalid UserName and Password', () => {
        element(by.id('userName')).sendKeys('admin1');
        element(by.id('password')).sendKeys('admin1');
        element(by.id('loginBtn')).click(); return browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return '/Login';
            });
        }, 10000);
    });
});

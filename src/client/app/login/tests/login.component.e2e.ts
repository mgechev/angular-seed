describe('App', () => {

    beforeEach(() => {
        browser.get('/login');
    });

    it('should login successfully', () => {
        browser.sleep(2000);
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        expect(browser.getCurrentUrl()()).toEqual('');
    });
    
     it('should not login', () => {
        browser.sleep(2000);
        element(by.id('userName')).sendKeys('admins');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        expect(browser.getCurrentUrl()()).toEqual('/login');
    });
});

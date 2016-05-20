describe('Technology Add', () => {
    beforeEach(() => {
        browser.get('/Login');
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        element(by.id('technologyLink')).click();
    });
    it('Should save the Technology', () => {
        var beforeAdd: any;
        var afterAdd: any;
        beforeAdd = element.all(by.css('tr')).count();
        element.all(by.id('addNewTechnology')).click();
        element(by.id('technology')).sendKeys('TestTechnology');
        element(by.id('saveTechnology')).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Technology');
        afterAdd = element.all(by.css('tr')).count();
        expect(afterAdd).toEqual(beforeAdd + 1);
    });
    it('Should cancel', () => {
        element.all(by.id('saveTechnology')).click();
        element(by.id('canceleTechnology')).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Technology');
    });

    it('should navigate to edit', () => {
        var row = element.all(by.css('tr td a')).get(1);
        element.all(by.css('tr td a')).get(1).click();
        element(by.id('technology')).clear();
        element(by.id('technology')).sendKeys('TestEdit');
        element(by.id('saveTechnology')).click();
        expect(row.getText()).toBe('TestEdit');
    });
});

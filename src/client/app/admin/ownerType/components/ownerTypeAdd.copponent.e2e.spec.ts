describe('OwnerType Add', () => {
    beforeEach(() => {
        browser.get('/Login');
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        element(by.id('ownerTypeLink')).click();
    });
    it('Should save the ownerType', () => {
        var beforeAdd: any;
        var afterAdd: any;
        beforeAdd = element.all(by.css('tr')).count();
        element.all(by.id('addNewOwnerType')).click();
        element(by.id('addOwnerType')).sendKeys('Manager');
        element(by.id('saveOwnerType')).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/OwnerType');
        afterAdd = element.all(by.css('tr')).count();
        expect(afterAdd).toEqual(beforeAdd + 1);
    });
    it('Should cancel ownerType', () => {
        element.all(by.id('addNewOwnerType')).click();
        element(by.id('cancelOwnerType')).click();
        expect(browser.getCurrentUrl()).toContain('/Admin/OwnerType');
    });

    it('should edit ownerType', () => {
        var row = element.all(by.css('tr td a')).get(1);
        element.all(by.css('tr td a')).get(1).click();
        element(by.id('addOwnerType')).clear();
        element(by.id('addOwnerType')).sendKeys('TestEdit');
        element(by.id('saveOwnerType')).click();
        expect(row.getText()).toBe('TestEdit');
    });
});

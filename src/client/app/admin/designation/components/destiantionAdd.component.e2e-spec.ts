describe('designation Add', () => {
    beforeEach(() => {
        browser.get('/Login');
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        element(by.id('designationLink')).click();
    });
    it('Should save the designation', () => {
        var beforeAdd: any;
        var afterAdd: any;
        beforeAdd = element.all(by.css('tr')).count();
        element.all(by.id('addNewDestination')).click();
        element(by.id('addDesignation')).sendKeys('Manager');
        element(by.id('saveDesignation')).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Designation');
        afterAdd = element.all(by.css('tr')).count();
        expect(afterAdd).toEqual(beforeAdd + 1);
    });
    it('Should cancel designation', () => {
        element.all(by.id('addNewDestination')).click();
        element(by.id('cancelDestiantion')).click();
        expect(browser.getCurrentUrl()).toContain('/Admin/Designation');
    });

    it('should edit designation', () => {
        var row = element.all(by.css('tr td a')).get(1);
        element.all(by.css('tr td a')).get(1).click();
        element(by.id('addDesignation')).clear();
        element(by.id('addDesignation')).sendKeys('TestEdit');
        element(by.id('saveDesignation')).click();
        expect(row.getText()).toBe('TestEdit');
    });
});

describe('Qualification Add', () => {
    beforeEach(() => {
        browser.get('/Login');
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        element(by.id('qualificationLink')).click();
    });
    it('Should save the qualification', () => {
        var beforeAdd: any;
        var afterAdd: any;
        beforeAdd = element.all(by.css('tr')).count();
        element.all(by.id('addNewQualification')).click();
        element(by.id('addQualification')).sendKeys('Manager');
        element(by.id('saveQualification')).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Qualification');
        afterAdd = element.all(by.css('tr')).count();
        expect(afterAdd).toEqual(beforeAdd + 1);
    });
    it('Should cancel qualification', () => {
        element.all(by.id('addNewQualification')).click();
        element(by.id('cancelQualification')).click();
        expect(browser.getCurrentUrl()).toContain('/Admin/Qualification');
    });

    it('should navigate to edit qualification', () => {
        var row = element.all(by.css('tr td a')).get(1);
        element.all(by.css('tr td a')).get(1).click();
        element(by.id('addQualification')).clear();
        element(by.id('addQualification')).sendKeys('TestEdit');
        element(by.id('saveQualification')).click();
        expect(row.getText()).toBe('TestEdit');
    });
});

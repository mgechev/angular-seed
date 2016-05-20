describe('Practice Add', () => {
    beforeEach(() => {
        browser.get('/Login');
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        element(by.id('practiceLink')).click();
    });
    it('Should save the practice', () => {
        var beforeAdd: any;
        var afterAdd: any;
        beforeAdd = element.all(by.css('tr')).count();
        element.all(by.id('addNewPractice')).click();
        element(by.id('practice')).sendKeys('TestPractice');
        element(by.id('savePractice')).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Practice');
        afterAdd = element.all(by.css('tr')).count();
        expect(afterAdd).toEqual(beforeAdd + 1);
    });
    it('Should cancel', () => {
        element.all(by.id('addNewPractice')).click();
        element(by.id('cancelePractice')).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Practice');
    });

    it('should navigate to edit', () => {
        var row = element.all(by.css('tr td a')).get(1);
        element.all(by.css('tr td a')).get(1).click();
        element(by.id('practice')).clear();
        element(by.id('practice')).sendKeys('TestEdit');
        element(by.id('savePractice')).click();
        expect(row.getText()).toBe('TestEdit');
    });
});

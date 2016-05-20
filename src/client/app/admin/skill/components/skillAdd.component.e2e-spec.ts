describe('Skill Add', () => {
    beforeEach(() => {
        browser.get('/Login');
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        element(by.id('skillLink')).click();
    });
    it('Should save the skill', () => {
        var beforeAdd: any;
        var afterAdd: any;
        beforeAdd = element.all(by.css('tr')).count();
        element.all(by.id('addNewSkill')).click();
        element(by.id('addSkill')).sendKeys('Manager');
        element(by.id('saveSkill')).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Skill');
        afterAdd = element.all(by.css('tr')).count();
        expect(afterAdd).toEqual(beforeAdd + 1);
    });
    it('Should cancel skill', () => {
        element.all(by.id('addNewSkill')).click();
        element(by.id('cancelSkill')).click();
        expect(browser.getCurrentUrl()).toContain('/Admin/Skill');
    });

    it('should navigate to edit skill', () => {
        var row = element.all(by.css('tr td a')).get(1);
        element.all(by.css('tr td a')).get(1).click();
        element(by.id('addSkill')).clear();
        element(by.id('addSkill')).sendKeys('TestEdit');
        element(by.id('saveSkill')).click();
        expect(row.getText()).toBe('TestEdit');
    });
});

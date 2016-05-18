describe('New Technologies', () => {
    browser.get('/Admin/Technology/Edit');
});


it('Should save the Technology', () => {
    element(by.id('technology')).sendKeys('Angular JS');
    element(by.id('saveTechnology')).click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/Admin/Technology');
});


it('Should cancele', () => {
    element(by.id('canceleTechnology')).click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/Admin/Technology');
});

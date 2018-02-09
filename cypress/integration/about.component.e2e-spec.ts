describe('About', () => {

  beforeEach(() => {
    cy.visit('/about');
  });

  it('should have correct feature heading', () => {
    cy.get('sd-about h2').should('have.text', 'Features');
  });

});

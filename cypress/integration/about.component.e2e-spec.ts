describe('About', () => {

  it('should have correct feature heading', () => {
    cy.visit('/about');
    cy.get('sd-about h2').should('have.text', 'Features');
  });

  it('should use our custom cypress command', () => {
    cy.visitAbout();
    cy.get('sd-about h2').should('have.text', 'Features');
  });

});

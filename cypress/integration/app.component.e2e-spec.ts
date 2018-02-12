describe('App', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should have a title', () => {
    cy.title().should('be.equal', 'Welcome to angular-seed!');
  });

  it('should have <nav>', () => {
    cy.get('sd-app sd-navbar nav');
  });

  it('should have correct nav text for Home', () => {
    cy.get('sd-app sd-navbar nav a:first-child').should('have.text', 'HOME');
  });

  it('should have correct nav text for About', () => {
    cy.get('sd-app sd-navbar nav a:nth-child(2)').should('have.text', 'ABOUT');
  });

});

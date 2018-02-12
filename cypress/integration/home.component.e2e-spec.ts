describe('Home', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should have an input', () => {
    cy.get('sd-home form input');
  });

  it('should have a list of computer scientists', () => {
    cy.get('sd-home ul').find('li')
      .should('have.length', 4)
      .first().should('have.text', 'Edsger Dijkstra')
      .next().should('have.text', 'Donald Knuth')
      .next().should('have.text', 'Alan Turing')
      .next().should('have.text', 'Grace Hopper');
  });

  it('should add a name to the list using the form', () => {
    cy.get('sd-home form input').type('Tim Berners-Lee');
    cy.get('sd-home form button').click();
    cy.get('sd-home ul').find('li')
      .should('have.length', 5)
      .eq(4).should('have.text', 'Tim Berners-Lee');
  });

});

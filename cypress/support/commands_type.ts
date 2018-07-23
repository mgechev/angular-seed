/**
 * Merge Cypress interface with our custom commands
 */
declare namespace Cypress {
  interface Chainable<Subject = any> {
    visitAbout(options?: Partial<VisitOptions>): Chainable<Window>;
  }
}

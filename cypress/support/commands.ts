/**
 * This example commands.ts shows you how to create custom commands or overwrite existing commands.
 * Please note that you will need to add the typescript definition of each custom command to commands_type.ts
 * The 'visitAbout' custom command below serves as a real example, it is used in the 'about' spec.
 *
 * For more comprehensive examples of custom commands, please see:
 * https://on.cypress.io/custom-commands
 */

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { /*...*/ });

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { /*...*/ });

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { /*...*/ });


// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { /*...*/ });


Cypress.Commands.add('visitAbout', (options?) => cy.visit('/about', options));

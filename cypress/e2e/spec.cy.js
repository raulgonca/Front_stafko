//Tet para la pagina del login

import cy from "cypress";

describe('Login Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/login'); // direccion de la Aplicacion ejecutandose
  });

  it('should display login form', () => {
    cy.get('form').should('exist');
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should allow user "israel" to login with valid credentials', () => {
    cy.get('input[name="username"]').type('raul'); // Utiliza el nombre de usuario 
    cy.get('input[name="password"]').type('hola'); // Utiliza una contraseña válida
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/main/israel'); // Verifica que la URL cambie después del inicio de sesión
  });

  it('should display error message with invalid credentials', () => {
    cy.get('input[name="username"]').type('israel'); // Introduce un nombre de usuario inválido
    cy.get('input[name="password"]').type('contraseña_invalida'); // Introduce una contraseña inválida
    cy.get('button[type="submit"]').click();
    cy.get('.swal2-popup').should('exist'); // Verifica que se muestre el mensaje de error
  });
});

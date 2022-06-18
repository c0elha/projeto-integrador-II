describe('auth create-user', () => {
  beforeEach(() => {
    cy.viewport(1200, 600);
    cy.visit('http://localhost:3000');
  });

  var usernameMock = 'geovanaapcoelhocorrea';
  var passwordMock = 'Geo@563921';

  it('should create user', () => {
    cy.visit('http://localhost:3000/auth/register');

    cy.get('legend').contains('Cadastrar-se');

    cy.get('input[name=first_name]').type('Geovana');
    cy.get('input[name=last_name]').type('Coelho');

    cy.get('input[name=username]').type(usernameMock);
    cy.get('input[name=email]').type('geovanacoelhocorrea+2@hotmail.com');

    cy.get('input[name=password]').type(passwordMock);
    cy.get('input[name=password_confirmation]').type(passwordMock);

    cy.get('button[type="submit"]').click();

    cy.get('[href="/auth/profile"]').should('exist');
  });
});

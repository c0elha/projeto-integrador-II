describe('ocurrences create and edit', () => {
  beforeEach(() => {
    cy.viewport(1200, 820);
    cy.visit('http://localhost:3000/auth/login');

    cy.get('input[name=username]').type(usernameMock);
    cy.get('input[name=password]').type(passwordMock);

    cy.get('button[type="submit"]').click();

    cy.get('[href="/auth/profile"]').should('exist');
  });

  var usernameMock = 'geovanaapcoelhocorrea';
  var passwordMock = 'Geo@563921';

  it('should create occurrence', () => {
    cy.get('[href="/occurrences/list"]').click();
    cy.get('[href="/occurrences/create"]').click();

    cy.get('#category').select('1');

    cy.get('input[name=title]').type('Alagamento');

    cy.get('textarea[name=description]').type(
      'Sempre que chove acontece alagamento nesse local, precisa ser feito algo em relação a isso. Muitos moradores sofrem com isso.'
    );

    // simulate map moving
    cy.get('.leaflet-container')
      .trigger('mousedown', 'center')
      .trigger('mousemove', 30, 30)
      .trigger('mouseup')
      .click();
    
    cy.get('button[type="submit"]').click();
    
  });
});

describe('auth login e logout', () => {
    beforeEach(() => {
        cy.viewport(1200, 600)
        cy.visit('http://localhost:3000')
    })

    var usernameMock = 'geovanaapcoelhocorrea';
    var passwordMock = 'Geo@563921';

    it('should login', () => {
        cy.visit('http://localhost:3000/auth/login')

        cy.get('input[name=username]').type(usernameMock)
        cy.get('input[name=password]').type(passwordMock)

        cy.get('button[type="submit"]').click();

        cy.get('[href="/auth/profile"]').should('exist');
    });


    it('should logout', () => {
        cy.visit('http://localhost:3000/auth/login')

        cy.get('input[name=username]').type(usernameMock)
        cy.get('input[name=password]').type(passwordMock)

        cy.get('button[type="submit"]').click();

        cy.get('[href="/auth/profile"]').should('exist');
        cy.get('#btn-logout').click();
    });
})
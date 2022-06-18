describe('Navigation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport(1200, 600)
    })

    it('should navigate to the home page', () => {
        
        cy.url().should('include', '/')
        cy.get('h2').contains('Sistema web para registro de ocorrências pelos munícipes de Lins-SP')
      })

    it('should navigate to the about page', () => {
      
      cy.get('a[href*="sobre"]').click()
      cy.url().should('include', '#sobre')
      cy.get('h2').contains('Sobre o projeto')
    })

    it('should navigate to the occurrences page', () => {

        cy.get('a[href*="#ocorrencias-lista"]').click()
        cy.url().should('include', '#ocorrencias-lista')
        cy.get('h2').contains('Acompanhar ocorrências')
      })

      it('should navigate to the all occurrences page', () => {
   
        cy.get('a[href*="/occurrences/all"]').click()
        cy.url().should('include', '/occurrences/all')
        cy.get('#map').click()
      })
  })

  
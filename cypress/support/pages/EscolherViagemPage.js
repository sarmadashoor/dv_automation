//Choose Travel Page
class EscolherViagemPage {
    validateEscolherViagemUrl() {
        cy.url().should('include', 'escolher-viagem');
     }

     clickCancelButtn() {
        cy.get('input[value="X Cancel"]').click();
    }
}

module.exports = EscolherViagemPage;

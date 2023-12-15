import { Given,When,Then } from "@badeball/cypress-cucumber-preprocessor"
import BuyTicketsPage from '../../support/pages/BuyTicketsPage'
import EscolherViagemPage from '../../support/pages/EscolherViagemPage';

const buyTicketsPage = new BuyTicketsPage();
const escolherViagemPage = new EscolherViagemPage();

Given('I navigate to the Buy Tickets page', () => {
    return buyTicketsPage.visit();
});

When('I search for online tickets', (dataTable) => {
    const data = dataTable.hashes();
    return cy.wrap(null).then(() => {
        buyTicketsPage.selectFromToDestination(data);
        buyTicketsPage.selectDatesByDays(data);
        buyTicketsPage.clickSubmitBttn();
    });
});

Then('I click Cancel', () =>{
    return escolherViagemPage.clickCancelButtn();
});

Then('I validate all parameters for the train search are saved', () => {
    return buyTicketsPage.validateSearchParams();
});

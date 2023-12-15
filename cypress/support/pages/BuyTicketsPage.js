class BuyTicketsPage {

    visit() {
        cy.visit('https://www.cp.pt/passageiros/en/buy-tickets');
        this.validateBuyTicketsUrl();
    }

    validateBuyTicketsUrl() {
       cy.url().should('include', 'buy-tickets');
    }

    selectFromToDestination(data) {
        const row = data[0];
        this.from = row.From;
        this.to = row.To;

        cy.get('input[title="From "]').clear().type(this.from);
        cy.get(`strong:contains('${this.from}')`, { xpath: true }).click()
        cy.get('input[title="To "]').clear().type(this.to);
        cy.get(`strong:contains('${this.to}')`, { xpath: true }).click()
    }

    selectDatesByDays(data) {
        const row = data[0];
        const depart_after_days = row.Depart_After_Days;
        const return_after_days = row.Return_After_Days;
        cy.get('input#datepicker-first').invoke('val').then((date) => {
            const currentDate = date.replace(/,/g, ''); // Remove all commas from the date string
            this.departDate = this.getNDaysAfter(currentDate, depart_after_days);
            this.returnDate = this.getNDaysAfter(currentDate, return_after_days);
            cy.get('input[name="departDate"]').click().clear();
            cy.get('input[name="returnDate"]').click().type(this.returnDate);
            cy.get('input[name="departDate"]').click().type(this.departDate);
        });
    }

    clickSubmitBttn(){
        cy.get('input[type="submit"]').should('not.be.disabled').click();
    }

    validateSearchParams() {
        const from = this.getFrom();
        const to = this.getTo();
        const departDate = this.getDepartDate();
        const returnDate = this.getReturnDate();

        cy.contains(from).as('fromText');
        cy.get('@fromText').should('be.visible');

        cy.contains(to).as('toText');
        cy.get('@toText').should('be.visible');

        cy.get('input#datepicker-first')
        .invoke('val')
        .then((datepickerValue) => {
          expect(datepickerValue).to.equal(departDate);
        });

        cy.get('input#datepicker-second')
        .invoke('val')
        .then((datepickerValue) => {
          expect(datepickerValue).to.equal(returnDate);
        });
    }

    getFrom(){
        return this.from;
    }

    getTo(){
        return this.to;
    }

    getDepartDate() {
        return this.departDate;
    }

    getReturnDate() {
        return this.returnDate;
    }

    getNDaysAfter(inputDate, days) {
        const dateParts = inputDate.split(' ');
        const day = parseInt(dateParts[0], 10);
        const month = dateParts[1];
        const year = parseInt(dateParts[2], 10);

        const months = {
            "January": 0, "February": 1, "March": 2, "April": 3,
            "May": 4, "June": 5, "July": 6, "August": 7,
            "September": 8, "October": 9, "November": 10, "December": 11
        };

        const daysChecked = Number.isInteger(days) ? days : parseInt(days, 10);

        const dateObject = new Date(year, months[month], day);
        dateObject.setDate(dateObject.getDate() + daysChecked);

        const newDay = dateObject.getDate();
        const newMonth = Object.keys(months)[dateObject.getMonth()];
        const newYear = dateObject.getFullYear();

        return `${newDay} ${newMonth}, ${newYear}`;
    }
}

module.exports = BuyTicketsPage;

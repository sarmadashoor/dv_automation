# DV_AUTOMATION - Cypress

Proof of concept Automation framework for front-end testing using Cypress and Cucumber.

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine. Please see [Node.js website](https://nodejs.org/en/) for installation instructions.

### Installation and Running Tests

1. Clone this repository:

    ```bash
    git clone https://github.com/sarmadashoor/dv_automation
    ```

2. Navigate to the Project Directory and Install all dependencies:

    ```bash
    cd dv_automation
    npm install
    ```

3. Running the Cypress Tests:

    **Using NPM:**

    - To invoke the Cypress UI test runner:

        ```bash
        npm run cypress:open
        ```

    - To run tests via command line:

        ```bash
        npm run cypress:run
        ```

    **Using npx or yarn:**

    ```bash
    npx cypress open
    npx cypress run
    yarn run cypress open
    yarn run cypress run
    ```

## Folder Structure



```
cypress/
│
├── downloads                       # Standard folder created during init of cypress - left blank
│
├── fixtures
│   └── example.json                # Example data created during init of cypress project
│
├── integration
│   └── tests
│       ├── ticketRequest.feature   # Cucumber feature file for ticket requests
│       └── ticketRequest.js        # Corresponding JavaScript test step file
│
├── screenshots
│   └── screenshot-cypress.png      # Screenshots captured during test runs
│
└── support
    ├── pages
    │   ├── BuyTicketsPage.js                 # Page object model for buying tickets
    │   └── EscolherViagemPage.js             # Page object model for trip selection page
    ├── commands.js                           # Custom Cypress commands - default from init of cypress project
    └── e2e.js                                # End-to-end test setup/configuration - default from init of cypress project
```



## Design Architecture

I have chosen to leverage Cucumber for test case creation and a page object model design pattern for organizing front-end automation.

The basic structure looks like this, test cases are housed in:

`Cypress/integration/tests`, where each test has a corresponding `.feature` (Cucumber) file and a `.js` step file.

For example:

```plaintext
Feature: Ticket Request Scenarios

  Scenario: Submit Online Ticket Request and Cancel
    Given I navigate to the Buy Tickets page
    When I search for online tickets
        | From           | To                | Depart_After_Days | Return_After_Days |
        | Lagos          | Porto - Campanha  |      3            |      5            |
    Then I click Cancel
    Then I validate all parameters for the train search are saved
```

The bdd language (Given/When/Then) corresponds to java script code outlined in the step file:

```javascript
Given('I navigate to the Buy Tickets page', () => {
    return buyTicketsPage.visit();
});
...

Then('I click Cancel', () =>{
    return escolherViagemPage.clickCancelButtn();
});

```

This allows for all possible automation steps to be outlined in the step file to be used as reuasable compenents in multiple feature files, as well as multiple scenarios with in a particular feature file.

The other advantage to using cucumber along with step files is that the data for the test can be housed directly in the cucumber feature file. The cucumber bdd format can also double as a manual test that can also be leverged by manual testers (if needed).


The POM pattern is levereged in this framework using page objects housed in the Cypress/support/pages directory.

These page objects are based on the url pattern of the end point they contain code for. For example:

```javascript

// Code example from BuyTicketsPage.js
// This code represents a reusable class for Buy Tickets page operations in Cypress.

class BuyTicketsPage {
    // Methods and logic
}
```



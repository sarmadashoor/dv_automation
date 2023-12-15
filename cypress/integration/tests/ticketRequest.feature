Feature: Ticket Request Scenarios

  Scenario: Submit Online Ticket Request and Cancel
    Given I navigate to the Buy Tickets page
    When I search for online tickets
        | From           | To                | Depart_After_Days | Return_After_Days |
        | Lagos          | Porto - Campanha  |      3            |      5            |
    Then I click Cancel
    Then I validate all parameters for the train search are saved

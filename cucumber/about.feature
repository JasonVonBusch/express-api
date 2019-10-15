Feature: About

   # About page for the application
   Scenario Outline: User opens up the About page
    When the User opens Chrome and goes to localhost:3000/about
    Then the User is able to see the About page
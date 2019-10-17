Feature: As a user, i want to see the About page

Scenario: user gets the about page description
   Given a controller
   When the controller description functions gets called
   Then the description should be This should say something that describes the application
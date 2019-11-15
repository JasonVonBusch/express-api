var chai = require("chai");
var cucumber = require("cucumber");
var aboutController = require("../../dist/controllers/about.controller");

cucumber.Given('a controller', function() {
    this.controller = new aboutController.AboutController();
    chai.expect(this.controller).is.not.null;
});

cucumber.When('the controller description functions gets called', function() {
    this.actual = this.controller.Description();
    chai.expect(this.actual).is.not.null;
});

cucumber.Then('the description should be This should say something that describes the application', function() {
    chai.expect(this.actual).to.be.equal("This should say something that describes the application.");
});
import {expect} from "chai";
import {Given, When, Then} from "cucumber";

import {AboutController} from "../../controllers/about.controller"

Given('a controller', function() {
    this.controller = new AboutController();
})

When('the controller gets the description', function() {
    this.actual = this.controller.Description();
})

Then('the description should be {string}', function(expected: string) {
    expect(this.actual).to.be.equal(expected);
})
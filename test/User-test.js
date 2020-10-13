const chai = require("chai");
const expect = chai.expect;

const User = require("../src/User");
const testUsers = require("../dummy-data/testUsers");

describe("User", function() {
    let id, name, pantry, favoriteRecipes;
    beforeEach(function() {
        user = new Card(dummyData.id, dummyData.name, dummyData.pantry, favoriteRecipes)
    });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });
  
});
const chai = require("chai");
const expect = chai.expect;

const User = require("../src/User");
const testUsers = require("./dummy-data.js/testUsers.js");

describe("User", function() {
    let id, name, pantry, favoriteRecipes;
    beforeEach(function() {
        user = new User(testUsers.id, testUsers.name, testUsers.pantry, favoriteRecipes)
    });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be a new instance of User', function() {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should have an id', function() {
    expect(user.id).to.equal(testUsers.id);
  });

  it('should have a name', function() {
    expect(user.name).to.equal(testUsers.name);
  });  
});
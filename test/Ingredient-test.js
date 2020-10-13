const chai = require('chai');
const expect = chai.expect;

const Ingredient = require ("../src/Ingredient");

describe('Ingredient', function() {
  let ingredient;

  beforeEach(function() {
    ingredient = new Ingredient(1, 'cheese', 500);
  });

  it('should be a function', function() {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of an Ingredient', function() {
    expect(ingredient).to.be.an.instanceof(Ingredient);
  });

  it('should have an id', function() {
    expect(ingredient.id).to.equal(1);
  });

  it('should have a name', function() {
    expect(ingredient.name).to.equal('cheese');
  });

  it('should have an estimated cost in cents', function() {
    expect(ingredient.estimatedCostInCents).to.equal(500);
  });
});

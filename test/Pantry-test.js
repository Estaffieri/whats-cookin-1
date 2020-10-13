const chai = require('chai');
const expect = chai.expect;

const Pantry = require("../src/Pantry");

describe('Pantry', () => {
  let pantry;
  let ingredientList;
  beforeEach(() => {
    ingredientList = [{
      "ingredient": 100,
      "amount": 4
    },
    {
      "ingredient": 200,
      "amount": 4
    },
    {
      "ingredient": 300,
      "amount": 10
    },
    {
      "ingredient": 400,
      "amount": 5
    },
    {
      "ingredient": 500,
      "amount": 5
    },
    {
      "ingredient": 600,
      "amount": 6
    },
    {
      "ingredient": 700,
      "amount": 8
    }];
    pantry = new Pantry(ingredientList);
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should instantiate an instance of a class', () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should store a list of cooking items', () => {
    expect(pantry.pantryList).to.deep.equal([{
      "ingredient": 100,
      "amount": 4
    },
    {
      "ingredient": 200,
      "amount": 4
    },
    {
      "ingredient": 300,
      "amount": 10
    },
    {
      "ingredient": 400,
      "amount": 5
    },
    {
      "ingredient": 500,
      "amount": 5
    },
    {
      "ingredient": 600,
      "amount": 6
    },
    {
      "ingredient": 700,
      "amount": 8
    }]);
  });

  it('should store ingredient ids', () => {
    expect(pantry.pantryList[0].ingredient).to.equal(100);
    expect(pantry.pantryList[2].ingredient).to.equal(300);

  });

  it('should store the amount of each ingredient in the pantry', () => {
    expect(pantry.pantryList[1].amount).to.equal(4);
    expect(pantry.pantryList[6].amount).to.equal(8);
  });
});

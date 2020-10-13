const chai = require('chai');
const expect = chai.expect;
const Recipe = require("../src/Recipe");
const Ingredient = require('../src/Ingredient');

describe('Recipe', function() {
  let ingredient1;
  let ingredient2;
  let ingredient3;
  let allIngredients;
  let recipe;


  beforeEach(function() {
    ingredient1 = new Ingredient(10, 'cheese', 500);
    ingredient2 = new Ingredient(20, 'pepper', 75);
    ingredient3 = new Ingredient(30, 'parsley', 100);
    allIngredients = [ingredient1, ingredient2, ingredient3];
    recipe = new Recipe(13, "https://vignette.wikia.nocookie.net/marveldatabase/images/1/16/James_Howlett_%28Earth-616%29_from_Wolverine_Vol_7_1_Silva_Variant_cover_001.jpg/revision/latest/scale-to-width-down/658?cb=20191123041154)",
      [
        {
          "id": 10,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 20,
          "quantity": {
            "amount": 3,
            "unit": "teaspoons"
          }
        },
        {
          "id": 30,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        }
      ],
      [{"instruction": "Mix together", "number": 1}, {"instruction": "Cook until hot", "number": 2}], "Peppered Cheese", ["appetizer", "lunch"]);
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should have an id', () => {
    expect(recipe.id).to.equal(13);
  });

  it('should have an image', () => {
    expect(recipe.image).to.equal("https://vignette.wikia.nocookie.net/marveldatabase/images/1/16/James_Howlett_%28Earth-616%29_from_Wolverine_Vol_7_1_Silva_Variant_cover_001.jpg/revision/latest/scale-to-width-down/658?cb=20191123041154)");
  });

  it('should have ingredients', () => {
    expect(recipe.ingredients).to.deep.equal([
      {
        "id": 10,
        "quantity": {
          "amount": 2,
          "unit": "cups"
        }
      },
      {
        "id": 20,
        "quantity": {
          "amount": 3,
          "unit": "teaspoons"
        }
      },
      {
        "id": 30,
        "quantity": {
          "amount": 1,
          "unit": "tablespoon"
        }
      }
    ]);
  });

  it('should have instructions', () => {
    expect(recipe.instructions).to.deep.equal([{"instruction": "Mix together", "number": 1}, {"instruction": "Cook until hot", "number": 2}]);
  });

  it('should have a name', () => {
    expect(recipe.name).to.equal("Peppered Cheese");
  });

  it('should have an id', () => {
    expect(recipe.tags).to.deep.equal(["appetizer", "lunch"]);
  });

  it('should return the cooking instructions', () => {
    expect(recipe.getInstructions()).to.deep.equal([{1: "Mix together"}, {2: "Cook until hot"}]);
  });

  it('should add up the cost of all ingredients in the recipe', () => {
    expect(recipe.getCostOfIngredients(allIngredients)).to.equal(6.75);
  });
});

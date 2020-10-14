const chai = require("chai");
const expect = chai.expect;

const User = require("../src/User");
const Pantry = require("../src/Pantry")
const userDummyData = require("./dummy-data/testUsers");
// const testUser = userDummyData;
const testRecipes = require("./dummy-data/testRecipes");

describe("User", function() {
  let id, name, pantry, favoriteRecipes, ingredientList;
  beforeEach(function() {
    pantry = new Pantry(userDummyData[0].pantry);
    user = new User(userDummyData[0].id, userDummyData[0].name, pantry)

  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be a new instance of User', function() {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should have an id', function() {
    expect(user.id).to.equal(1);
  });

  it('should have a name', function() {
    expect(user.name).to.equal("Saige O'Kon");
  });

  it('should have a pantry', function() {
    expect(user.pantry).to.equal(pantry);
    expect(user.pantry.pantryList[0].ingredient).to.equal(11477);
    expect(user.pantry.pantryList[2].amount).to.equal(10);
  });

  it('should have a place to store favorite recipes', function() {
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('should be able to add a recipe to favoriteRecipes', function() {
    user.addFavoriteRecipe(testRecipes[0]);

    expect(user.favoriteRecipes.length).to.equal(1);
    expect(user.favoriteRecipes[0].id).to.equal(595736);
  });

  it('should be able to remove a recipe from favoriteRecipes', function() {
    user.addFavoriteRecipe(testRecipes[0]);
    user.addFavoriteRecipe(testRecipes[1])
    user.removeFavoriteRecipe(testRecipes[0])

    expect(user.favoriteRecipes.length).to.equal(1);
    expect(user.favoriteRecipes[0].id).to.equal(678353);
    expect(user.favoriteRecipes[0].name).to.equal("Maple Dijon Apple Cider Grilled Pork Chops");

  });


  it('should be able to search for a specific tag within favoriteRecipes', function() {
    user.addFavoriteRecipe(testRecipes[0]);
    user.addFavoriteRecipe(testRecipes[1]);
    expect(user.findByTag("snack")).to.deep.equal([{
      "id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [
        {
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "id": 19206,
          "quantity": {
            "amount": 3,
            "unit": "Tbsp"
          }
        },
        {
          "id": 19334,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 1012047,
          "quantity": {
            "amount": 24,
            "unit": "servings"
          }
        },
        {
          "id": 10019903,
          "quantity": {
            "amount": 2,
            "unit": "c"
          }
        },
        {
          "id": 1145,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "id": 2050,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
          "number": 1
        },
        {
          "instruction": "Add egg and vanilla and mix until combined.",
          "number": 2
        },
        {
          "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
          "number": 3
        },
        {
          "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
          "number": 4
        },
        {
          "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
          "number": 5
        },
        {
          "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
          "number": 6
        }
      ],
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    }]);
  });
  it('should be able to tell if we have enough ingredients to make a recipe', function() {
    user.addFavoriteRecipe(testRecipes[0]);
    user.addFavoriteRecipe({
      "id": 1,
      "image": "picture",
      "ingredients": [{
        "id": 20081,
        "quantity": {
          "amount": 1.5,
          "unit": "c"
        }
      }],
      "instructions": [{"instruction":"Cook", "number": 1}],
      "name": "test",
      "tags": ["lunch"]
    });
    expect(user.checkPantry(user.favoriteRecipes[0])).to.equal(false);
    user.checkPantry(user.favoriteRecipes[1]);
    expect(user.shoppingList).to.deep.equal([])
    expect(user.checkPantry(user.favoriteRecipes[1])).to.equal(true);
    console.log("TEST", user.shoppingList);
  });
});

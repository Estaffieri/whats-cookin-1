const Pantry = require("./Pantry");

class User {
  constructor(id, name, pantry) {
    this.id = id;
    this.name = name;
    this.pantry = pantry;
    this.favoriteRecipes = [];
  }
  addFavoriteRecipe(recipe) {
    this.favoriteRecipes.push(recipe)
  }
  removeFavoriteRecipe(unfavoritedRecipe) {
    this.favoriteRecipes.forEach(recipe => {
      if (recipe === unfavoritedRecipe) {
        this.favoriteRecipes.splice(this.favoriteRecipes.indexOf(recipe), 1)
      }
    })
  }
  findByTag(searchTerm) {
    let results = [];

    this.favoriteRecipes.forEach(recipe => {
      if (recipe.tags.includes(searchTerm)) {
        results.push(recipe)
      }
    })
    return results
  }
  checkPantry(recipe) {
      recipe.ingredients
  }
}



if (typeof module !== 'undefined') {
  module.exports = User;
}

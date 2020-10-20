class User {
  constructor(id, name, pantry) {
    this.id = id,
    this.name = name,
    this.pantry = pantry,
    this.favoriteRecipes = [],
    this.shoppingList = []
  }
  addFavoriteRecipe(recipe) {
    this.favoriteRecipes.push(recipe);
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
    this.shoppingList = [];
    let pantryNumbers = [];
    this.pantry.pantryList.forEach(item => {
      pantryNumbers.push(item.ingredient);
    });
    recipe.ingredients.forEach (ingredient => {
      if (!pantryNumbers.includes(ingredient.id)) {
        this.shoppingList.push(ingredient);
      }
    });
    return (!this.shoppingList.length) ? true : false;
  }
  returnShoppingList() {
      return this.shoppingList
  }
}



if (typeof module !== 'undefined') {
  module.exports = User;
}

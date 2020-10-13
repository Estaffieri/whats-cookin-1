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
  findByTag(searchTerm) {
    let results = [];
    console.log(this.favoriteRecipes);
    
    this.favoriteRecipes.forEach(recipe => {
        console.log(this.favoriteRecipes);
        console.log("A", recipe);
        if (recipe.tags.includes(searchTerm)) {
            console.log("B", results);
            results.push(recipe)
            console.log("C", results);
        }
        // results.push(recipe.tags.filter(tag => {
        //     return tag === searchTerm
        // }))

    //   recipe.tags.filter(tag => {
    //     if (tag === searchTerm) {
    //       results.push(recipe)
    //     }
    //   })
    //   return 
    // })
    // return results
    })
    return results
    }   
}



if (typeof module !== 'undefined') {
  module.exports = User;
}
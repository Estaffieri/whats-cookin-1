class User {
    constructor(id, name, pantry) {
        this.id = id;
        this.name = name;
        this.pantry = pantry;
        this.favoriteRecipes = [];
    }
}



if (typeof module !== 'undefined') {
    module.exports = User;
  }
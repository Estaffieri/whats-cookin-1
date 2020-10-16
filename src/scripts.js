const homeButton = document.querySelector("#home");
const favoritesButton = document.querySelector("#favorites");
const searchButton = document.querySelector("#search");
const welcome = document.querySelector(".welcome-user");
const searchBar = document.querySelector(".search");

const sectionHeading = document.querySelector(".recipes-heading");

const homeView = document.querySelector(".home-view");
const favoriteView = document.querySelector(".favorite-view");
const singleCategoryView = document.querySelector(".single-category-view");
const recipeView = document.querySelector(".recipe-view");

const checkPantryButton = document.querySelector("#pantry-button");
const getShoppingList = document.querySelector("#shopping-list-button");
const recipeImage = document.querySelector(".recipe-image");
const ingredientList = document.querySelector(".ingredient-list");
const directionsList = document.querySelector(".directions-list")

let user;
let pantry;

window.addEventListener('load', loadApp);
homeView.addEventListener('click', function() {
  goToRecipeResults(event.target.innerText.toLowerCase());
});
searchButton.addEventListener('click', function() {
  goToRecipeResults(searchBar.value);
});
homeButton.addEventListener('click', goToHome);
favoritesButton.addEventListener('click', goToFavorites);

function goToHome() {
  singleCategoryView.classList.add('hidden');
  homeView.classList.remove('hidden');
  sectionHeading.innerText = `Need Ideas?`;
}

function goToFavorites() {
  singleCategoryView.classList.add('hidden');
  homeView.classList.add('hidden');
  favoriteView.classList.remove('hidden');
  sectionHeading.innerText = `My favorite recipes`;
}

function getTags() {
  let tags = [];
  recipeData.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  return tags.map(tag => {
    let word = tag.charAt(0).toUpperCase() + tag.slice(1);
    return word;
  });
}

function generateCategories() {
  let categories = getTags();
  displayCat(categories);
}

function displayCat(items) {
  homeView.innerHTML = '';
  items.forEach(item => {
    homeView.innerHTML += `<article class="category">${item}
    </article>`;
  });
}

function getRandom(max) {
  return Math.floor(Math.random() * max)
}

function instantiatePantry(data, index) {
  pantry = new Pantry(data[index].pantry);
}

function instantiateUser(data, index) {
  user = new User(data[index].id, data[index].name, pantry);
}

function getFirstName(name) {
  let splitName = name.split(' ');
  return splitName.shift();
}

function loadApp() {
  let indexNum = getRandom(usersData.length);
  instantiatePantry(usersData, indexNum);
  instantiateUser(usersData, indexNum);
  welcome.innerText = `Welcome ${getFirstName(user.name)}!`
  generateCategories();
}

function getRecipesByCategory(category) {
  let matches = [];
  recipeData.forEach(recipe => {
    if (recipe.tags.includes(category)) {
      matches.push(recipe);
    }
  });
  return matches;
}

function getRecipesByIngredient(input) {
  let matches = [];
  let ingredientId = '';
  ingredientsData.forEach(ingredient => {
    if (ingredient.name === input || ingredient.name === input.toLowerCase()) {
      ingredientId = ingredient.id;
    }
  });
  recipeData.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (ingredient.id === ingredientId) {
        matches.push(recipe);
      }
    });
  });
  return matches;
}

function getRecipes(input) {
  let recipes = '';
  if (getRecipesByCategory(input).length) {
    recipes = getRecipesByCategory(input);
  } else if (getRecipesByIngredient(input).length) {
    recipes = getRecipesByIngredient(input);
  };
  return recipes;
}

function goToRecipeResults(input) {
  let recipes = getRecipes(input);
  if (recipes) {
    singleCategoryView.innerHTML = '';
    recipes.forEach(recipe => {
      singleCategoryView.innerHTML += `<article class="category-recipe"><img src="${recipe.image}" alt="photo of ${recipe.name}"><h4 class="recipe-name">${recipe.name}<h4></article>`;
    });
    sectionHeading.innerText = input.charAt(0).toUpperCase() + input.slice(1);
  } else {
    singleCategoryView.innerHTML = '';
    sectionHeading.innerText = `Sorry!  We did not find ${input} in our recipes.  Please try again.`;
  }
  singleCategoryView.classList.remove('hidden');
  homeView.classList.add('hidden');
}

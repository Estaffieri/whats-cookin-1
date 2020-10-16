const homeButton = document.querySelector("#home");
const favoritesButton = document.querySelector("#favorites");
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
  displayByCategory(event.target.innerText.toLowerCase());
});

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
  display(categories);
}

function display(items) {
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
    };
  });
  console.log(matches);
  return matches;
}

function displayByCategory(category) {
  let recipes = getRecipesByCategory(category);
  singleCategoryView.innerHTML = '';
  recipes.forEach(recipe => {
    singleCategoryView.innerHTML += `<article class="category-recipe">      <img src="${recipe.image}" alt="photo of ${recipe.name}"><h4 class="recipe-name">${recipe.name}<h4></article>`;
  });
  singleCategoryView.classList.remove('hidden');
  sectionHeading.innerText = category.charAt(0).toUpperCase() + category.slice(1);
  homeView.classList.add('hidden');
}

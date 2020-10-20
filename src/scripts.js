const homeButton = document.querySelector(".home-view-button");
const favoritesButton = document.querySelector(".favorites-view-button");
const searchButton = document.querySelector(".search-button");
const welcome = document.querySelector(".greeting");
const searchBar = document.querySelector(".search-input");

const sectionHeading = document.querySelector(".recipes-heading");

const homeView = document.querySelector(".home-view");
const favoriteView = document.querySelector(".favorite-view");
const singleCategoryView = document.querySelector(".single-category-view");
const recipeView = document.querySelector(".recipe-view");

const checkPantryButton = document.querySelector("#pantry-button");
const getShoppingList = document.querySelector("#shopping-list-button");
const recipeImage = document.querySelector(".recipe-image");
const ingredientList = document.querySelector(".ingredient-list");
const directionsList = document.querySelector(".directions-list");
const shoppingListPrice = document.querySelector(".shopping-list-price");
const neededItemsList = document.querySelector(".needed-items-list");

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
singleCategoryView.addEventListener('click', function() {
  handleRecipeClick(event);
});
favoriteView.addEventListener('click', function() {
  handleClickInFavoriteView(event);
});
recipeView.addEventListener('click', function() {
  handleClickInRecipeView(event);
});

function handleRecipeClick(event) {
  if (event.target.classList.contains('bookmark')) {
    updateFavorites(event);
  } else {
    showSelectRecipe(event.target.closest('article').children[2].innerText);
  }
}

function handleClickInFavoriteView(event) {
  handleRecipeClick(event);
  displayFavorites();
}

function handleClickInRecipeView(event) {
  if (event.target.classList.contains('bookmark')) {
    let recipeName = event.target.closest('article').children[0].currentSrc;
    let recipe = recipeData.find(recipe => {
      return recipe.image === recipeName
    })
    addOrRemoveFavorite(recipe);
    toggleBookmark(event);
  }
}

function updateFavorites(event) {
  let recipeName = event.target.closest('article').children[2].innerText;
  let recipe = recipeData.find(recipe => {
    return recipe.name === recipeName
  })
  addOrRemoveFavorite(recipe);
  toggleBookmark(event);
}

function toggleBookmark(event) {
  let icon = event.target.closest('article').children[1];
  if (icon.classList.contains('unchecked')) {
    icon.outerHTML = `<img class="bookmark checked" id="favorite" src="assets/icons/bookmark.svg" alt="bookmark-icon">`;
  } else {
    icon.outerHTML = `<img class="bookmark unchecked" id="favorite" src="assets/icons/001-bookmark.svg" alt="bookmark-icon">`;
  }
}

function addOrRemoveFavorite(recipe) {
  if (!user.favoriteRecipes.includes(recipe)) {
    user.addFavoriteRecipe(recipe);
  } else {
    user.removeFavoriteRecipe(recipe);
  }
}

function showSelectRecipe(targetName) {
  let recipe = getSingleRecipe(targetName);
  sectionHeading.innerText = `${recipe.name}`;
  checkUserFavorites(recipe);
  displayIngredients(recipe);
  displayDirections(recipe);
  displayShoppingList(recipe);
  recipeView.classList.remove('hidden');
  singleCategoryView.classList.add('hidden');
  favoriteView.classList.add('hidden');
  document.documentElement.scrollTop = 0;
}

function checkUserFavorites(recipe) {
  if (user.favoriteRecipes.length) {
    user.favoriteRecipes.forEach(favorite => {
      if (favorite.id === recipe.id) {
        console.log(recipe)
        recipeImage.innerHTML = `<img class="single-recipe-picture" src="${recipe.image}" alt="photo of ${recipe.image}"><img class="bookmark checked" id="favorite" src="assets/icons/bookmark.svg" alt="bookmark-icon">`;
      }
    });
  }  else {
    recipeImage.innerHTML = `<img class="single-recipe-picture" src="${recipe.image}" alt="photo of ${recipe.image}"><img class="bookmark unchecked" id="favorite" src="assets/icons/001-bookmark.svg" alt="bookmark-icon">`;
  }
}

function goToHome() {
  homeView.classList.remove('hidden');
  singleCategoryView.classList.add('hidden');
  recipeView.classList.add('hidden');
  favoriteView.classList.add('hidden');
  sectionHeading.innerText = `Need Ideas?`;
  document.documentElement.scrollTop = 0;
}

function displayFavorites() {
  if (user.favoriteRecipes) {
    favoriteView.innerHTML = '';
    user.favoriteRecipes.forEach(recipe => {
      favoriteView.innerHTML += `<div class="container"><article class="category-recipe"><img class="recipe-picture" src="${recipe.image}" alt="photo of ${recipe.name}"><img class="bookmark checked" id="favorite" src="assets/icons/bookmark.svg" alt="bookmark-icon">
      <h4 class="recipe-name">${recipe.name}<h4></article></div>`;
    });
  };
}

function goToFavorites() {
  displayFavorites();
  singleCategoryView.classList.add('hidden');
  recipeView.classList.add('hidden');
  homeView.classList.add('hidden');
  favoriteView.classList.remove('hidden');
  sectionHeading.innerText = `My favorite recipes`;  document.documentElement.scrollTop = 0;
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
    return tag.charAt(0).toUpperCase() + tag.slice(1);
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
  welcome.innerHTML = `<h2>Welcome ${getFirstName(user.name)}!</h2>`
  generateCategories();
  document.documentElement.scrollTop = 0;
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
    if (ingredient.name === input.toLowerCase()) {
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

function getSingleRecipe(name) {
  let rInfo = recipeData.find(recipe => recipe.name === name);
  let recipe = new Recipe(rInfo.id, rInfo.image, rInfo.ingredients, rInfo.instructions, rInfo.name, rInfo.tags);
  return recipe
}

function displayResults(results, searchInput) {
  if (results) {
    singleCategoryView.innerHTML = '';
    results.forEach(recipe => {
      singleCategoryView.innerHTML += `<div class="container"><article class="category-recipe"><img class="recipe-picture" src="${recipe.image}" alt="photo of ${recipe.name}"><img class="bookmark unchecked" id="favorite" src="assets/icons/001-bookmark.svg" alt="bookmark-icon">
      <h4 class="recipe-name">${recipe.name}<h4></article></div>`;
    });
    sectionHeading.innerText = searchInput.charAt(0).toUpperCase() + searchInput.slice(1);
  } else {
    singleCategoryView.innerHTML = '';
    sectionHeading.innerText = `Sorry!  We did not find ${searchInput} in our recipes.  Please try again.`;
  }
}

function goToRecipeResults(input) {
  let recipes = getRecipes(input);
  displayResults(recipes, input);
  singleCategoryView.classList.remove('hidden');
  homeView.classList.add('hidden');
  recipeView.classList.add('hidden');
  favoriteView.classList.add('hidden');
  document.documentElement.scrollTop = 0;
}

function displayShoppingList(recipe) {
  user.checkPantry(recipe);
  let neededItems = recipe.getIngredientList(user.returnShoppingList());
  let price = recipe.getCostOfIngredients(user.returnShoppingList(), ingredientsData);
  shoppingListPrice.innerText = `Approximate cost: $${price}`
  neededItemsList.innerHTML = '';
  neededItems.forEach(item => {
    neededItemsList.innerHTML += `<p class="needed-item">${item}</p><br>`
  });
}

function displayDirections(recipe) {
  let list = recipe.getInstructions();
  directionsList.innerHTML = '';
  list.forEach(item => {
    directionsList.innerHTML += `<p class="direction-item"><b>Step ${item.stepNumber}</b>: ${item.step}</><br>`
  });
}

function displayIngredients(recipe) {
  let list = recipe.getIngredientList(recipe.ingredients);
  ingredientList.innerHTML = '';
  list.forEach(item => {
    ingredientList.innerHTML += `<p class="ingredient-item">${item}</p><br>`
  });
}

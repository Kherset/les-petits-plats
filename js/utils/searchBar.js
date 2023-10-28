// Get references to HTML elements
const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('main');
const numberOfRecipes = document.getElementById('number-of-recipes');

let recipes;

// Function to perform the search
async function searchRecipe() {
  recipes = await fetchRecipes();
  createResearchList(recipes);
}

// Create a list of recipes based on the data
function createResearchList(recipes) {
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let recipeCard = cardTemplate(recipe);
    resultsList.appendChild(recipeCard);
  }
}

// Add an event listener to the search input for filtering data
searchInput.addEventListener('input', filterData);

// Filter the data based on user input
function filterData(e) {
  resultsList.innerHTML = '';

  const searchedName = e.target.value.toLowerCase();

  if (searchedName.length >= 3) {
    let filteredData = searchInsideRecipes(recipes, searchedName);
    displayNumberOfRecipes(filteredData);
  } else {
    numberOfRecipes.innerText = `${recipes.length} recettes`;
    createResearchList(recipes);
  }
}

// Search for keywords inside recipes
function searchInsideRecipes(dataBase, dataResearched) {
  const filteredData = [];
  for (let i = 0; i < dataBase.length; i++) {
    const element = dataBase[i];
    if (
      element.name.toLowerCase().includes(dataResearched) ||
      element.description.toLowerCase().includes(dataResearched) ||
      element.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(dataResearched))
    ) {
      filteredData.push(element);
    }
  }
  return filteredData;
}

// Display the number of recipes and update the list
function displayNumberOfRecipes(filteredData) {
  const numRecipes = filteredData.length;
  if (numRecipes === 1) {
    numberOfRecipes.innerText = `${numRecipes} recette`;
  } else {
    numberOfRecipes.innerText = `${numRecipes} recettes`;
  }
  createResearchList(filteredData);
}

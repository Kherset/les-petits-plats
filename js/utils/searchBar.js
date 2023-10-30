// Get references to HTML elements
const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('main');
const numberOfRecipes = document.getElementById('number-of-recipes');

let recipes;
let filteredData = [];
let searchedName = '';

// Function to perform the search
async function searchRecipe() {
  recipes = await fetchRecipes();
  filteredData = [...recipes]
  createResearchList(filteredData);
}

// Create a list of recipes based on the data
function createResearchList(recipes) {
  recipes.forEach(recipe => {
    let recipeCard = cardTemplate(recipe);
    resultsList.appendChild(recipeCard);
  });
}

// Add an event listener to the search input for filtering data
searchInput.addEventListener('input', filterData);

// Filter the data based on user input
function filterData(e) {
  resultsList.innerHTML = '';

  searchedName = e.target.value.toLowerCase();

  if (searchedName.length >= 3) {
    filteredData = searchInsideRecipes(searchedName);
    displayNumberOfRecipes(filteredData);
  } else {
    numberOfRecipes.innerText = `${recipes.length} recettes`;
    createResearchList(recipes);
    filteredData = [...recipes];
  }

  if (selectedTags.length > 0) {
    filterDataByTags();
  }
}

// Search for keywords inside recipes
function searchInsideRecipes(dataResearched) {
    const filteredData_ = filteredData.filter(element =>
    element.name.toLowerCase().includes(dataResearched) ||
    element.description.toLowerCase().includes(dataResearched) ||
    element.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(dataResearched))
  );
  return filteredData_;
}

// Display the number of recipes and update the list
function displayNumberOfRecipes(filteredData) {
  if (filteredData.length === 1) {
    numberOfRecipes.innerText = `${filteredData.length} recette`;
    createResearchList(filteredData);
  } else {
    numberOfRecipes.innerText = `${filteredData.length} recettes`;
    createResearchList(filteredData);
  }
}

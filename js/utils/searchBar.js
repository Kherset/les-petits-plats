// Get references to HTML elements
const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('main');
const numberOfRecipes = document.getElementById('number-of-recipes');

let recipes;
let filteredData = [];
let searchedName = '';
let searchTextLength = 0;

// Function to perform the search
async function searchRecipe() {
  recipes = await fetchRecipes();
  filteredData = [...recipes]
  createResearchList(filteredData);
}

// Create a list of recipes based on the data
function createResearchList(recipes) {
  for (let i = 0; i < recipes.length; i++) {
    let recipeCard = cardTemplate(recipes[i]);
    resultsList.appendChild(recipeCard);
  }
}

// Add an event listener to the search input for filtering data
searchInput.addEventListener('input', filterData);

// Filter the data based on user input
function filterData(e) {
  resultsList.innerHTML = '';

  searchedName = e.target.value.toLowerCase();

  if (searchedName.length >= 3 && searchedName.length > searchTextLength) {
    filteredData = searchInsideRecipes(searchedName);
    displayNumberOfRecipes(filteredData);
  } else if (searchedName.length >= 3) {
    filteredData = [];
    for (let i = 0; i < recipes.length; i++) {
      filteredData.push(recipes[i]);
    }
    filteredData = searchInsideRecipes(searchedName);
    displayNumberOfRecipes(filteredData);
  } else {
    numberOfRecipes.innerText = `${recipes.length} recettes`;
    createResearchList(recipes);
    filteredData = [];
    for (let i = 0; i < recipes.length; i++) {
      filteredData.push(recipes[i]);
    }
  }

  if (selectedTags.length > 0) {
    filterDataByTags();
  }
  searchTextLength = searchedName.length;
}

// Search for keywords inside recipes
function searchInsideRecipes(dataResearched) {
  const filteredData_ = [];
  for (let i = 0; i < filteredData.length; i++) {
    let element = filteredData[i];
    if (element.name.toLowerCase().includes(dataResearched) ||
        element.description.toLowerCase().includes(dataResearched)) {
      filteredData_.push(element);
    } else {
      for (let j = 0; j < element.ingredients.length; j++) {
        if (element.ingredients[j].ingredient.toLowerCase().includes(dataResearched)) {
          filteredData_.push(element);
          break;
        }
      }
    }
  }
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

// Global variables
const ingredientsArray = new Set(); // Stores unique ingredients
const appliancesArray = new Set(); // Stores unique appliances
const utensilsArray = new Set(); // Stores unique utensils

const dropdownIngredients = document.getElementById('ingredients-list');
const dropdownAppliances = document.getElementById('appliances-list');
const dropdownUtensils = document.getElementById('utensils-list');

let isInitialSearch = true; // Flag for initial search
let selectedTags = []; // Array to store selected tags

// Fetch and process ingredients
async function fetchIngredients() {
  recipes = await fetchRecipes();
  recipes.forEach(recipe => {
    let allIngredients = recipe.ingredients;
    allIngredients.forEach(ingredient => {
      const uniformizedIngredient = uniformizeString(ingredient.ingredient);
      ingredientsArray.add(uniformizedIngredient);
    });
  });
  return ingredientsArray;
}

// Fetch and process appliances
// Fetch and process appliances
async function fetchAppliances() {
  recipes = await fetchRecipes();
  recipes.forEach(recipe => {
    const uniformizedAppliance = uniformizeString(recipe.appliance);
    appliancesArray.add(uniformizedAppliance);
  });
  return appliancesArray;
}


// Fetch and process utensils
async function fetchUtensils() {
  recipes = await fetchRecipes();
  recipes.forEach(recipe => {
    let allUtensils = recipe.ustensils;
    allUtensils.forEach(utensil => {
      const uniformizedUtensil = uniformizeString(utensil);
      utensilsArray.add(uniformizedUtensil);
    });
  });
  return utensilsArray;
}

function sortArrayAlphabetically(array) {
  return array.sort((a, b) => a.localeCompare(b, 'fr'));
}

// Add tags for ingredients, appliances, and utensils
async function addTags() {
  let ingredients = Array.from(await fetchIngredients());
  let appliances = Array.from(await fetchAppliances());
  let utensils = Array.from(await fetchUtensils());

  // Sort the arrays alphabetically
  sortArrayAlphabetically(ingredients);
  sortArrayAlphabetically(appliances);
  sortArrayAlphabetically(utensils);

  // Create and add tags to the respective dropdowns
  ingredients.forEach(ingredient => {
    let newIngredient = document.createElement('li');
    newIngredient.setAttribute('class', 'option');
    newIngredient.innerText = ingredient;
    dropdownIngredients.appendChild(newIngredient);
  });

  appliances.forEach(appliance => {
    let newAppliance = document.createElement('li');
    newAppliance.setAttribute('class', 'option');
    newAppliance.innerText = appliance;
    dropdownAppliances.appendChild(newAppliance);
  });

  utensils.forEach(utensil => {
    let newUtensil = document.createElement('li');
    newUtensil.setAttribute('class', 'option');
    newUtensil.innerText = utensil;
    dropdownUtensils.appendChild(newUtensil);
  });
}

// Standardize the string by removing accents and converting to title case
function uniformizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Display tags and handle tag removal
async function displayTag() {
  await addTags();
  const tagList = document.getElementById('tags-list');
  const tags = document.querySelectorAll('.option');
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      const tagContainer = document.createElement('span');
      tagContainer.setAttribute('class', 'tag-container');

      const newTag = document.createElement('li');
      newTag.setAttribute('class', 'tag');

      const tagContent = document.createElement('p');
      tagContent.innerText = tag.outerText;
      tagContent.setAttribute('class', 'tag');

      const crossTag = document.createElement('i');
      crossTag.setAttribute('class', 'fa-solid fa-xmark cross-tag');

      tagContainer.appendChild(newTag);
      newTag.appendChild(tagContent);
      tagContainer.appendChild(crossTag);
      tag.style.display = 'none';
      tagList.appendChild(tagContainer);
      removeTag(tag, tagContainer);

      // Filter data by selected tags
      filterDataByTags(tagContent.outerText);
    });
  });
  researchTag('ingredients-list', 'ingredients-input');
  researchTag('appliances-list', 'appliances-input');
  researchTag('utensils-list', 'utensils-input');
}

// Handle removal of tags
function removeTag(tag, tagContainer) {
  const cross = tagContainer.querySelector('.cross-tag');

  cross.addEventListener('click', () => {
    tag.style.display = ''; // Re-display the item in the options list
    tagContainer.style.display = 'none'; // Hide the tag

    // Remove the tag from the selected tags list
    const tagText = tag.outerText;
    selectedTags = selectedTags.filter(selectedTag => selectedTag !== tagText);

    // Re-run the filtering with the remaining tags
    filterDataByTags();
  });
}

displayTag();

// Filter recipes based on selected tags
function filterDataByTags(tag) {
  // let dataBase = await fetchRecipes();

  let main = document.getElementById('main');

  if (!tag) {
    filteredData = [...recipes];
  }

  if (searchedName.length > 2) {
    filteredData = searchInsideRecipes(searchedName);
  }

  // Check if the tag has already been selected and add or remove it accordingly
  if (selectedTags.includes(tag)) {
    selectedTags = selectedTags.filter(selectedTag => selectedTag !== tag);
  } else if (tag) {
    selectedTags.push(tag);
  }

  main.innerHTML = ''; // Clear the previous content.

  for (const data of filteredData) {
    // Check if at least one tag is selected, then check the filters
    if (selectedTags.length === 0 || selectedTags.every(selectedTag => {
      return data.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(selectedTag.toLowerCase())) ||
             data.appliance.toLowerCase().includes(selectedTag.toLowerCase()) ||
             data.ustensils.some(ustensil => ustensil.toLowerCase().includes(selectedTag.toLowerCase()));
    })) {
      const filteredCard = cardTemplate(data);
      main.appendChild(filteredCard);
    }
  }
  let numberOfRecipesWithTag = main.childNodes;
  displayNumberOfRecipesFilteredByTags(numberOfRecipesWithTag);
}

// Display the number of recipes based on filters
function displayNumberOfRecipesFilteredByTags(filteredData) {
  if (filteredData.length === 1) {
    numberOfRecipes.innerText = `${filteredData.length} recette`;
  } else {
    numberOfRecipes.innerText = `${filteredData.length} recettes`;
  }
}

// Search bar for tags
async function researchTag(listId, inputId) {
  const tagList = document.getElementById(listId);
  const tagInput = document.getElementById(inputId);

  tagInput.addEventListener('input', function() {
    const userInput = tagInput.value.toLowerCase(); // Convert the input to lowercase for case-insensitive comparison

    tagList.childNodes.forEach(tag => {
      const tagText = tag.innerText.toLowerCase();
      if (tagText.includes(userInput)) {
        tag.style.display = 'block'; // Display the matching element
      } else {
        tag.style.display = 'none'; // Hide elements that don't match
      }
    });
  });
}

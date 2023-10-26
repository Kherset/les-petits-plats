// Global variables
const ingredientsArray = new Set()
const appliancesArray = new Set()
const utensilsArray = new Set()

const dropdownIngredients = document.getElementById('ingredients-list')
const dropdownAppliances = document.getElementById('appliances-list')
const dropdownUtensils = document.getElementById('utensils-list')


async function fetchingredients() {
  recipes = await fetchRecipes();
  recipes.forEach(recipe => {
    let allIngredients = recipe.ingredients
      allIngredients.forEach(ingredient => {
        const uniformizedIngredient = uniformizeString(ingredient.ingredient);
        ingredientsArray.add(uniformizedIngredient);
      });
  });
  return ingredientsArray
}

async function fetchAppliances() {
  recipes = await fetchRecipes();
  recipes.forEach(recipe => {
    const uniformizedAppliance = uniformizeString(recipe.appliance);
    appliancesArray.add(uniformizedAppliance);
  });
  return appliancesArray
}

async function fetchUtensils() {
  recipes = await fetchRecipes();
  recipes.forEach(recipe => {
    let allUtensils = recipe.ustensils
    allUtensils.forEach(utensil => {
      const uniformizedUtensil = uniformizeString(utensil);
      utensilsArray.add(uniformizedUtensil);
    });
  });
  return utensilsArray
}

async function addTags() {
  let ingredients = Array.from(await fetchingredients());
  let appliances = Array.from(await fetchAppliances());
  let utensils = Array.from(await fetchUtensils());

  // Sort the arrays alphabetically
  ingredients.sort((a, b) => a.localeCompare(b, 'fr'));
  appliances.sort((a, b) => a.localeCompare(b, 'fr'));
  utensils.sort((a, b) => a.localeCompare(b, 'fr'));

  ingredients.forEach(ingredient => {
    let newIngredient = document.createElement('li');
    newIngredient.setAttribute('class', 'option');
    newIngredient.innerText = ingredient;
    dropdownIngredients.appendChild(newIngredient);
  });

  appliances.forEach(appliance => {
    let newappliance = document.createElement('li');
    newappliance.setAttribute('class', 'option');
    newappliance.innerText = appliance;
    dropdownAppliances.appendChild(newappliance);
  });

  utensils.forEach(utensil => {
    let newUtensil = document.createElement('li');
    newUtensil.setAttribute('class', 'option');
    newUtensil.innerText = utensil;
    dropdownUtensils.appendChild(newUtensil);
  });
}


function uniformizeString(str) {
  // Supprimez les accents et uniformisez la casse
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

addTags()


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
    });
  });
}

async function removeTag(tag, tagContainer) {
  const cross = tagContainer.querySelector('.cross-tag');

  cross.addEventListener('click', () => {
    tag.style.display = ''; // Re-display the item in the options list
    tagContainer.style.display = 'none'; // Hide the tag
  });
}



displayTag()

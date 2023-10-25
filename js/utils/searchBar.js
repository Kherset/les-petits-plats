const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('main');
const numberOfRecipes = document.getElementById('number-of-recipes');


let recipes

// Fonction pour effectuer la recherche
async function searchRecipe() {
  recipes = await fetchRecipes();
  // dataArray = orderList(recipes);
  createResearchList(recipes);
}

// function orderList(data) {
//   const orderedData = data.sort((a,b) => {
//     if (a.name.toLowerCase() < b.name.toLowerCase()) {
//       return -1
//     }
//     if (a.name.toLowerCase() > b.name.toLowerCase()) {
//       return 1
//     }
//     return 0;
//   })
//   return orderedData
// }

function createResearchList(recipes) {

  recipes.forEach(recipe => {
    let recipeCard = cardTemplate(recipe)
    resultsList.appendChild(recipeCard)
  });

}


searchInput.addEventListener('input', filterData);

function filterData(e) {
  resultsList.innerHTML = '';

  const searchedName = e.target.value.toLowerCase();

  if (searchedName.length >= 3) {
    const filteredData = recipes.filter(element => element.name.toLowerCase().includes(searchedName)
                                       || element.description.toLowerCase().includes(searchedName)
                                       || element.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchedName)))
    if (filteredData.length === 1) {
    numberOfRecipes.innerText = `${filteredData.length} recette`;
    createResearchList(filteredData);
    } else {
      numberOfRecipes.innerText = `${filteredData.length} recettes`;
      createResearchList(filteredData);
    }

  } else {
    numberOfRecipes.innerText = `${recipes.length} recettes`;
    createResearchList(recipes);
  }
}


// async function fetchIngredients(searchedName) {
//   const datas = await fetchRecipes()
//   datas.forEach(data => {
//     let ingredients = data.ingredients
//     ingredients.forEach(ingredient => {
//       console.log(ingredient.ingredient)
//     });
//   });

// }

// fetchIngredients()

// A generic function to fetch data from a JSON file via an HTTP request
async function fetchDataFromJSON(url) {
  try {
    const response = await fetch(url); // Send a GET request to the specified URL
    if (response.ok) { // Check if the response status is OK (200)
      const datas = await response.json(); // Parse the response JSON data
      return datas; // Return the parsed data
    } else {
      console.error("Failed to fetch data. Status code: " + response.status); // Log an error message if the request fails
    }
  } catch (error) {
    console.error("An error occurred:", error); // Log an error message if an exception occurs during the request
  }
}

// Function to fetch recipe data from a JSON file
async function fetchRecipes() {
  return await fetchDataFromJSON("datas/recipes.json");
}



async function displayData(recipes) {
	const cardsSection = document.querySelector("main");

	recipes.forEach((recipe) => {
		const recipeModel = cardTemplate(recipe);
		cardsSection.appendChild(recipeModel);
	});
}

async function init() {
  const numberOfRecipes = document.getElementById('number-of-recipes');
	try {
		const recipes = await fetchRecipes();
		displayData(recipes);
    numberOfRecipes.innerText = `${recipes.length} recettes`

	} catch (error) {
		console.error(error);
	}
  searchRecipe()
}

init();

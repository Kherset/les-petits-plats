// Function to fetch recipe data from a JSON file
async function fetchRecipes() {
  const url = "datas/recipes.json";
  try {
    const response = await fetch(url); // Send a GET request to the specified URL
    if (response.ok) { // Check if the response status is OK (200)
      const recipes = await response.json(); // Parse the response JSON data
      return recipes; // Return the parsed data
    } else {
      console.error("Failed to fetch data. Status code: " + response.status); // Log an error message if the request fails
    }
  } catch (error) {
    console.error("An error occurred:", error); // Log an error message if an exception occurs during the request
  }
}

// Function to display recipe data on the web page
async function displayData(recipes) {
  const cardsSection = document.querySelector("main");

  recipes.forEach((recipe) => {
    const recipeModel = cardTemplate(recipe); // Create a recipe card based on the data
    cardsSection.appendChild(recipeModel); // Add the card to the webpage
  });
}

// Initialize the application
async function init() {
  const numberOfRecipes = document.getElementById('number-of-recipes');
  try {
    const recipes = await fetchRecipes(); // Fetch recipe data
    displayData(recipes); // Display the fetched recipes on the webpage
    numberOfRecipes.innerText = `${recipes.length} recettes`; // Update the number of recipes displayed

  } catch (error) {
    console.error(error); // Log any errors that occur during initialization
  }
  searchRecipe(); // Call the searchRecipe function to start the search functionality
}

init(); // Initialize the application when the page loads

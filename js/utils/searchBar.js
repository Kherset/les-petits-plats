const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('main');


// Fonction pour effectuer la recherche
function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  resultsList.innerHTML = '';

  // Filtrez les données en fonction de la recherche
  const filteredData = data.filter(item => item.toLowerCase().includes(searchTerm));

  // Affichez les résultats dans la liste
  filteredData.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      resultsList.appendChild(listItem);
  });
}

// Attachez un gestionnaire d'événement à la barre de recherche pour déclencher la recherche lors de la frappe
searchInput.addEventListener('input', performSearch);

performSearch()


// async function searchBar() {
//   const recipesNames = await fetchRecipesNames()
//   const result = recipesNames.filter(function (element) {
//     return element % 2 === 0;
//   });
// }

// searchBar();

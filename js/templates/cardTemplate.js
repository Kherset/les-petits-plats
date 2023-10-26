// Function to build the card template
  function cardTemplate(data) {
    const { id, image, name, servings, ingredients, time, description, appliance } = data;

    // Create new recipe card
      const card = document.createElement('article');
      card.setAttribute('class', 'card');

    // Image part of the card
      const imgContainer = document.createElement('figure');
      imgContainer.setAttribute('class', 'img-container');

      const cardDuration = document.createElement('span');
      cardDuration.setAttribute('class', 'card-duration');
      cardDuration.innerText = `${time} min`

      const cardImage = document.createElement('img');
      cardImage.src = `images/recipes/${image}`
      cardImage.setAttribute('class', 'card-img')
      cardImage.setAttribute('alt', 'Image de la recette')

    // Text part of the card
      const textContent = document.createElement('section');
      textContent.setAttribute('class', 'text-content');

      const cardTitle = document.createElement('h3');
      cardTitle.setAttribute('class', 'recipe-title')
      cardTitle.innerText = `${name}`

      const recipeLabel = document.createElement('h4');
      recipeLabel.setAttribute('class', 'recipe-label')
      recipeLabel.innerText = 'Recette'

      const recipe = document.createElement('p');
      recipe.setAttribute('class', 'recipe')
      recipe.innerText = `${description}`

      const ingredientsLabel = document.createElement('h4');
      ingredientsLabel.setAttribute('class', 'ingredients-label')
      ingredientsLabel.innerText = 'Ingredients'

    // Ingredients part
      const ingredientsAndQuantityContainer = document.createElement('section');
      ingredientsAndQuantityContainer.setAttribute('class', 'ingredients-and-quantity-container');

      const ingredient = document.createElement('h5');
      ingredient.setAttribute('class', 'ingredient');

      const quantity = document.createElement('p');
      quantity.setAttribute('class', 'quantity')

    let ingredientsAndQuantity;

    ingredients.forEach(ingredient => {
      ingredientsAndQuantity = document.createElement('div');
      ingredientsAndQuantity.setAttribute('class', 'ingredients-and-quantity');

      const ingredientName = document.createElement('h5');
      ingredientName.setAttribute('class', 'ingredient');
      ingredientName.innerText = ingredient.ingredient;

      const quantity = document.createElement('p');
      quantity.setAttribute('class', 'quantity')
      if (ingredient.quantity && ingredient.unit) {
        quantity.innerText = ingredient.quantity + (ingredient.unit ? ' ' + ingredient.unit : '');
      } else if (ingredient.quantity && !ingredient.unit) {
        quantity.innerText = ingredient.quantity;
      } else {
        quantity.innerText = ''
      }
      ingredientsAndQuantity.appendChild(ingredientName);
      ingredientsAndQuantity.appendChild(quantity);
      ingredientsAndQuantityContainer.appendChild(ingredientsAndQuantity);
    });

    // Card building
    card.appendChild(imgContainer);
    imgContainer.appendChild(cardDuration);
    imgContainer.appendChild(cardImage);

    card.appendChild(textContent);
    textContent.appendChild(cardTitle)
    textContent.appendChild(recipeLabel)
    textContent.appendChild(recipe)
    textContent.appendChild(ingredientsLabel)
    textContent.appendChild(ingredient);
    textContent.appendChild(ingredientsAndQuantityContainer);

    return card
  }

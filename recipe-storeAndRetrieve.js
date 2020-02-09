"use strict";

  const recipe = require('./recipe');
  function addRecipeDetails({ title, ingredients, instructions }) {
    recipe.recipes.push({title, ingredients, instructions});
  }
  function retrieveRecipeDetails(title) {
    return recipe.recipes.find( details => details.title === title );
  }
  const recipeManipulation = {
    addRecipeDetails,
    retrieveRecipeDetails
};
  module.exports = recipeManipulation;
const db = require('../../data/db-config')

async function getRecipeById(recipe_id) {
  const recipeRes = await db('recipes as r')
    .where('r.recipe_id', recipe_id)

  return recipeRes
}

module.exports = {
  getRecipeById
}
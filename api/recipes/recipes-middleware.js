const { getRecipeById } = require('./recipes-model')

const checkRecipeId = async (req, res, next) => {
  const { recipe_id } = req.params
  try {
    const recipe = await getRecipeById(recipe_id)
    if (!recipe) {
      next({
        status: 404,
        message: `recipe with id ${recipe_id} not found`
      })
    } else {
      req.recipe = recipe
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkRecipeId
}
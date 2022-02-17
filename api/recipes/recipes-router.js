const router = require('express').Router()
const { getRecipeById } = require('./recipes-model')
const { checkRecipeId } = require('./recipes-middleware')

router.get('/:recipe_id', checkRecipeId, (req, res, next) => {
  getRecipeById(req.params.recipe_id)
    .then(recipe => {
      res.json(recipe)
    })
    .catch(() => {
      next()
    })
})

router.use((err, req, res, next) => {// eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router

exports.up = async function(knex) {
  await knex.schema
    .createTable('recipes', tbl => {
      tbl.increments('recipe_id')
      tbl.string('recipe_name', 128).notNullable().unique()
    })
    .createTable('ingredients', tbl => {
      tbl.increments('ingredient_id')
      tbl.string('ingredient_name', 128).notNullable().unique()
      tbl.string('ingredient_unit', 12)
    })
    .createTable('steps', tbl => {
      tbl.increments('step_id')
      tbl.string('step_instructions', 256)
      tbl.integer('step_number').notNullable()
      tbl.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipe_id')
        .inTable('recipes')
    })
    .createTable('step_ingredients', tbl => {
      tbl.increments('step_ingredient_id')
      tbl.float('quantity').notNullable()
      tbl.integer('step_id')
        .unsigned()
        .notNullable()
        .references('step_id')
        .inTable('steps')
      tbl.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredient_id')
        .inTable('ingredients')
    })
};

exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('step_ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes')
};

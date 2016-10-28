exports.up = function(knex, Promise) {
  return knex.schema.createTable('menu', function (table) {
    table.increments('id');
    table.integer('food');
    table.integer('price');
    table.integer('duration');


  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("menu");
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable('menu', function (table) {
    table.increments('id');
    table.string('food');
    table.integer('price');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('menu');
};




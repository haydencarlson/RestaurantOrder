
exports.up = function(knex, Promise) {
  return knex.schema.createTable('customer', function (table) {

    table.increments('id');
    table.integer('phone_number');
    table.text('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customer');
};

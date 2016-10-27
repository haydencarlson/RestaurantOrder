
exports.up = function(knex, Promise) {
  return knex.schema.createTable('order', function (table) {

    table.increments('id');
    table.integer('price');
    table.timestamp('time_received');
    table.integer('customer_id')


  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order');
};

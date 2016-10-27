
exports.up = function(knex, Promise) {
   return knex.schema.createTable('order_item', function (table) {
    table.increments('id');
    table.integer('order_id');
    table.integer('menu_id');
    table.integer('quality')


  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_item');
};

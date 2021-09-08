
exports.up = function(knex) {
  return knex.schema.hasTable('todos').then((exists)=>{
      if(!exists){
          return knex.schema.createTable('todos',table=>{
              table.increments('id').primary();
              table.string('task_name',100).notNullable();
              table.boolean('isCompleted').notNullable().defaultTo(0);
              table.integer('user_id').notNullable();
              table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
              table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
          })
      }
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};

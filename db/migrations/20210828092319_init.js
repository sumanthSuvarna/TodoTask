
exports.up = function(knex) {
    return knex.schema.hasTable('users').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('users',table=> {
    
                table.increments('id').primary();
                table.string('username', 100).notNullable().unique();
                table.string('email', 100).notNullable();
                table.string('password',255).notNullable();
                table.string('role',10);
            })
        }
      }); 
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};

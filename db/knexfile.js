// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host : process.env.HOST_NAME, 
      user : process.env.USER_NAME_TEST,// , 'postgres'
      password: process.env.DB_PWD,// , 'admin'
      database: process.env.DATABASE,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

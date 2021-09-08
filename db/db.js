const knex = require('knex');
const knexfile = require('./knexfile');

// TODO in prod, use dependency Injection
// to create knex instance so db access cannot be mocked
// for tests

const db = knex(knexfile.development);
module.exports =db;
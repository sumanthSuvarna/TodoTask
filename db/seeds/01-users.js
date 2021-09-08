const bcrypt = require('bcrypt')

exports.seed =  async function(knex, Promise){
  var tblName = 'users';
  var rows = [
    {username:'admin',  email:'admin@voltest.com',  password:await bcrypt.hash('admin!',10), role:'admin'},
    {username:'sumanth',email:'sumanth@voltest.com',password:await bcrypt.hash('suvarna',10),   role:'admin'},
    {username:'virat',  email:'virat@voltest.com',  password:await bcrypt.hash('kohli',10),     role:'user'},
    {username:'jimmy',  email:'jimmy@voltest.com',  password:await bcrypt.hash('anderson',10),  role:'user'}
  ];

  return knex(tblName)
            .del()
            .then(function(){
              return knex.insert(rows).into(tblName);
            });
}

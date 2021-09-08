const db =  require('../db/db');

class UserDAO {
    async createUser(username,email,password,role){
        const[id] = await db('users').insert({username,email,password,role}).returning('id');                        
        return id;
    }

    async getAllUsers(){
        const allUsers = await db.select('id','username','email','role').from('users')
        return allUsers
    }

    async getUserById(id){
        const user = await db('users').where({id}).select('id','username','email','role');
        return user;
    }

    async getUserByName(username){        
        const user = await db('users').where({username}).select('id','username','email','password','role');
        return user[0];
    }

    async getUserByEmail(email){        
        const user = await db('users').where({email}).select('id','username','email','password','role');
        return user[0];
    }

    async deleteUserById(id){        
        const rowsAffected = await db('users').where({'id':id}).del();
        return rowsAffected;
    }
    
    async getUserByNameEmail(username,email){        
        const user = await db('users').where({username}).orWhere({email}).select('id','username','email');
        return user;
    }
}

module.exports = new UserDAO();
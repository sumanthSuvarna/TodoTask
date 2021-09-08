const userDao = require('../dao/user_dao');
const bcrypt = require('bcryptjs')

class UserService {
    async createUser(userDto) {
        const {username, email,password, role} = userDto;    
        let user = await userDao.getUserByEmail(email);
        if(user.length>0){
            throw new Error('User Exists');
        }
        let hash = await this.hashpwd(password);    
        return userDao.createUser(username, email,hash, role.toLowerCase());
    }

    async hashpwd(password){
        let hash = await bcrypt.hash(password,10);
        return hash
    }

    getUsers(){
        return userDao.getAllUsers();
    }

    getUser(id){
        return userDao.getUserById(id);
    }

    deleteUserById(id){
        return userDao.deleteUserById(id);
    }
}

module.exports = new UserService();
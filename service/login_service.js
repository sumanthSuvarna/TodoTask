const jwt = require('jsonwebtoken');
const userDao = require('../dao/user_dao');
const bcrypt = require('bcryptjs')
require('dotenv').config();

class LoginService {
    createToken (user){
        let payload = user
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: process.env.ACCESS_TOKEN_ALGORITHM,
            expiresIn: 86400
        })
        return {accessToken};
    }

    async authenticate(loginDto){
        const {email,password} = loginDto;
        const user  = await userDao.getUserByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return null;
        } else {            
            delete user["password"];
            console.log(user)
            return user;
        }

    }
}

module.exports = new LoginService();
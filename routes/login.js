const express=  require('express')
const controller = require('../controllers/loginController');

const loginRouter = express.Router();

//POST Login
loginRouter.post('/',controller.getUser)

module.exports = loginRouter
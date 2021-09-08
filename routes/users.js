const express=  require('express')
const controller = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const jwtmd = jwtMiddleware();
const userRouter =  express.Router();

// GET,POST,DELETE on /api/users
userRouter.post('/',jwtmd.verifyToken,jwtmd.validateAdmin,controller.post)
userRouter.get('/',jwtmd.verifyToken,jwtmd.validateAdmin,controller.get)

// GET,POST,DELETE on /api/users/:id
userRouter.get('/:id',jwtmd.verifyToken,jwtmd.validateUser,controller.getById)
userRouter.delete('/:id',jwtmd.verifyToken,jwtmd.validateAdmin,controller.deleteUserById)
 
module.exports = userRouter
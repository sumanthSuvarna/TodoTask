const express=  require('express')
const controller = require('../controllers/taskController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const jwtmd = jwtMiddleware();
const taskRouter =  express.Router();

// GET,POST,DELETE on /api/users/tasks
taskRouter.post('/',controller.post)

// GET,POST,DELETE on /api/users/tasks/:id
taskRouter.get('/:id',controller.getById)
taskRouter.delete('/:id',controller.deleteTaskById)
taskRouter.put('/:id',controller.updateTaskById)
taskRouter.get('/latest/:id',controller.latestTasks)




 
module.exports = taskRouter
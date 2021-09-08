const taskDao = require('../dao/task_dao');

class TaskService {
    async createTask(taskDto){
        const {task_name,user_id} = taskDto;
        return await taskDao.createTask(task_name,user_id);
    }

    async getTasks(user_id){
        return taskDao.getTaskByUserId(user_id)
    }

    async deleteTaskById(id){
        return taskDao.deleteTaskById(id)
    }

    async updateTaskById(id){
        return taskDao.updateTaskCompleted(id)
    }

    async getLatestTasks(user_id){
        return taskDao.getLatestTasks(user_id)
    }




}

module.exports = new TaskService();
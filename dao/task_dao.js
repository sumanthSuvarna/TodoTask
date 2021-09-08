const db =  require('../db/db');

class TaskDAO {
    async createTask(task_name,user_id){
        const[task] = await db('todos').insert({task_name,user_id}).returning('task_name');                        
        return task;
    }

    async getTaskByTaskNameAndId(user_id,task_name){
        const userTasks = await db('todos').where('task_name', 'like', `%${task_name}%`)
                .andWhere({user_id})
                .select('id','task_name','isCompleted','user_id','created_at','updated_at')
        return userTasks
    }

    async getTaskByUserId(user_id){
        const userTasks = await db('todos').where({user_id})
                .select('id','task_name','isCompleted','user_id','created_at','updated_at')
                .orderBy('created_at', 'asc')
        return userTasks
    }

    async deleteTaskById(id){        
        const rowsAffected = await db('todos').where({'id':id}).del();
        return rowsAffected;
    }

    async updateTaskCompleted(id){
       const rowsAffected =await db('todos').update({ isCompleted: db.raw('NOT ??',  ['isCompleted']) }).where({id}).returning('isCompleted');
       return rowsAffected;

    }

    async getLatestTasks(user_id){
        const userTasks =  await db('todos').select('task_name','isCompleted').where({user_id}).orderBy('created_at', 'desc').limit(4)
        return userTasks;
    }
}

module.exports = new TaskDAO();
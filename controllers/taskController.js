const task_service = require('../service/task_service')

// GET, POST, PUT, DELETE for /user
class taskController{
    
    async post(req,res){
        try{
            const task_name = await task_service.createTask(req.body);
            res.status(201).json(task_name);
        }catch(err){
            res.status(400).send("Bad Request")
        }
    }

    getById(req,res){
        task_service.getTasks(req.params.id).then((tasks)=>{
                res.status(200).json(tasks)                     
        }).catch((err)=>{            
            res.status(400).send("Task Not Found")
        })
    }

    deleteTaskById(req,res){
        task_service.deleteTaskById(req.params.id).then((rowsAffected)=>{
            res.status(200).send("Task deleted")
        }).catch((err)=>{
            res.status(400).send("Task Not Found")
        })
    }

    updateTaskById(req,res){
        task_service.updateTaskById(req.params.id).then(()=>{
            res.status(201).send("Task Updated")
        }).catch((err)=>{
            res.status(400).send("User Not Found")
        })
    }

    latestTasks(req,res){
        task_service.getLatestTasks(req.params.id).then((tasks)=>{
            res.status(200).json(tasks)        
        }).catch((err)=>{
            res.status(400).send("User Not Found")
        })
    }
   
}
module.exports = new taskController();
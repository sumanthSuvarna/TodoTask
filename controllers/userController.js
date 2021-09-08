const user_service = require('../service/user_service')

// GET, POST, PUT, DELETE for /user
class userController{
    
    async post(req,res){
        try{
            const id = await user_service.createUser(req.body);
            res.status(201).json(id);
        }catch(err){
            if(err.message==="User Exists"){
                res.status(400).send("User Already Exists")
            }else{
                res.status(400).send("Bad Request")
            }           
        }
    }

    get(req,res) {
        user_service.getUsers().then((users)=>{
            res.status(200).json(users)
        }).catch(err =>{
            res.status(500).send("Internal server error")
        })
    }

    deleteAll(req,res){
 
    }

    getById(req,res){
        user_service.getUser(req.params.id).then((user)=>{
            if(user.length===0){
               res.status(404).send("User Not Found")
            }else{
                res.status(200).json(user[0])
            }            
        }).catch((err)=>{
            res.status(400).send("User Not Found")
        })
    }

    deleteUserById(req,res){
        user_service.deleteUserById(req.params.id).then((rowsAffected)=>{
            res.status(200).send("User deleted")
        }).catch((err)=>{
            res.status(400).send("User Not Found")
        })
    }
   
}
module.exports = new userController();
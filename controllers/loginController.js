const login_service = require('../service/login_service')


class LoginController{

    getUser(req,res){
        login_service.authenticate(req.body).then((user)=>{
            if(!user){
                res.status(401).send("Unauthorised User")
            }else{               
                const accessToken= login_service.createToken(user)                
                res.json(accessToken)
            }
        }).catch((err)=>{
            res.status(401).send("Unauthorised User")
        })
        
        
    }

}

module.exports=  new LoginController();
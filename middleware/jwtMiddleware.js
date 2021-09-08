const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtMiddleware(){

    function verifyToken (req,res,next){
        const bearerHeader = req.headers['authorization'];
       
       console.log(bearerHeader)
        if(typeof bearerHeader!== "undefined"){
            const bearer =  bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;            
            next();
        }else{
            res.sendStatus(403)
        }
    }

    function validateUser(req,res,next){
        console.log()
        jwt.verify(req.token,process.env.ACCESS_TOKEN_SECRET,(err,authData)=>{

            if(err){
                res.sendStatus(403)
            }else{
                if(authData.role.toUpperCase()==="ADMIN"
                    ||authData.role.toUpperCase()==="USER"){                    
                    req.user = authData;
                    next();
                }else{
                    res.sendStatus(403)
                }

            }
        })
    }

    function validateAdmin(req,res,next){
        jwt.verify(req.token,process.env.ACCESS_TOKEN_SECRET,(err,authData)=>{
            if(err){
                res.sendStatus(403)
            }else{
                console.log(authData)
                if(authData.role.toUpperCase()==="ADMIN"){                    
                    req.user = authData;
                    next();
                }else{
                    res.sendStatus(403)
                }

            }
        })
    }

    return {verifyToken,validateUser,validateAdmin}
    
}

module.exports = jwtMiddleware;
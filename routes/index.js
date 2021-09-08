const express=  require('express')
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');

const jwtmd = jwtMiddleware();

router.get('/',jwtmd.verifyToken,jwtmd.validateUser,function(req,res,next){
    res.status(200).json(req.user);
})

module.exports = router;


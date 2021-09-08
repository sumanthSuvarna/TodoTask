let express =  require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
var cors = require('cors')
require('dotenv').config();

let indexRouter= require('./routes/index');
let userRouter= require('./routes/users');
let loginRouter= require('./routes/login');
let taskRouter= require('./routes/tasks');

const app =  express();

app.use(logger('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'public')))

app.use('/',indexRouter)
app.use('/api/users/tasks',taskRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)



app.server = app.listen(process.env.PORT ,()=>{
    console.log(`Running on port ${process.env.PORT}`)
});
module.exports =app;


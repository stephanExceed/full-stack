const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const validateToken = require('./middlewares/auth');
const jwt = require('jsonwebtoken');





const app = express();
app.use(cors());
app.use(express.json())



const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');
const columnRouter = require('./routers/columns');
const subtaskRouter = require('./routers/subtasks')

app.use('/api/user', userRouter)
app.use('/api/tasks', taskRouter)
app.use('/api/columns', columnRouter)
app.use('/api/subtasks', subtaskRouter)

// app.get('/api/user/auth', validateToken)



const startServer = async () => {
    try {
        await mongoose.connect('mongodb+srv://stephan:stephan@cluster0.msoug.mongodb.net/full-stack?retryWrites=true&w=majority')
        app.listen(3001, () => console.log('SERVER STARTED ON PORT ' + 3001))
    } catch (e) {
        console.log(e)
    }
}

startServer()
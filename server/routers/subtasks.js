const router = require('express').Router();
const SubTask = require('../models/subtasks.model')
const verifyToken = require('../middlewares/auth');




router.post('/', verifyToken, async (req,res) => {
    console.log(req.body);
    const { title, taskId, status } = req.body;
    const newTask = await SubTask.create({
        title: title,
        taskId: taskId,
        status: status,
        userId: req.user.id
    })
    res.send(newTask)
})

router.get('/', verifyToken, async (req, res) => {
    const subTasks = await SubTask.find()
    res.send(subTasks)
})

router.put('/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const { status, title, taskId } = req.body;
    console.log(status, title, taskId)
    if(title) {
        console.log('title')
        const updatedSubTask = await SubTask.findByIdAndUpdate(id, {
            title: title
        }, {
            new: true
        })

        res.send(updatedSubTask)
    } else if (taskId) {
        console.log(taskId)
        const updatedSubTask = await SubTask.findByIdAndUpdate(id, {
            taskId: taskId
        }, {
            new: true
        })

        res.send(updatedSubTask)
    } else {
        console.log('status')
        const updatedSubTask = await SubTask.findByIdAndUpdate(id, {
            status: status
        }, {
            new: true
        })

        res.send(updatedSubTask)
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const deletedSubTask = await SubTask.findByIdAndDelete(id)
    console.log(deletedSubTask)
    res.send(deletedSubTask)
})

module.exports = router;
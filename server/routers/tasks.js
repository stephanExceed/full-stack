const router = require('express').Router();
const Task = require('../models/task.model')
const verifyToken = require('../middlewares/auth');
const e = require('express');



router.post('/', verifyToken, async (req,res) => {
    console.log(req.body);
    const { title, columnId, status } = req.body;
    const newTask = await Task.create({
        title: title,
        columnId: columnId,
        status: status,
        userId: req.user.id
    })
    res.send(newTask)
})

router.get('/', verifyToken, async (req, res) => {
    const tasks = await Task.find()
    res.send(tasks)
})

router.put('/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const { status, title, columnId } = req.body;
    console.log(status, title, columnId)
    if(title) {
        console.log('title')
        const updatedTask = await Task.findByIdAndUpdate(id, {
            title: title
        }, {
            new: true
        })

        res.send(updatedTask)
    } else if (columnId) {
        console.log(columnId)
        const updatedTask = await Task.findByIdAndUpdate(id, {
            columnId: columnId
        }, {
            new: true
        })

        res.send(updatedTask)
    } else {
        console.log('status')
        const updatedTask = await Task.findByIdAndUpdate(id, {
            status: status
        }, {
            new: true
        })

        res.send(updatedTask)
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id)
    console.log(deletedTask)
    res.send(deletedTask)
})

module.exports = router;
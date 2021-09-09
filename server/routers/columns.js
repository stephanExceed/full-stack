const router = require('express').Router();
const Column = require('../models/column.model');
const verifyToken = require('../middlewares/auth')


router.post('/', verifyToken, async (req, res) => {
    console.log(req.body)
    console.log(req.user)
    const newColumn = await Column.create({
        title: req.body.title,
        userId: req.user.id
    })
    res.send(newColumn)
})

router.get('/', async (req, res) => {
    const columns = await Column.find()
    res.send(columns)

})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { title } = req.body;
    console.log(id)
    const updatedColumn = await Column.findByIdAndUpdate(id ,{
        title: title
    }, {
        new: true
    })
    res.send(updatedColumn)
})

router.delete('/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const deletedColumn = await Column.findByIdAndDelete(id)
    console.log(deletedColumn)
    res.send(deletedColumn)
})

module.exports = router;
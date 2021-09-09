const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { sign } = require("jsonwebtoken");
const verifyToken = require('../middlewares/auth')


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const candidate = await User.findOne({
        username: username
    })

    if(candidate) {
        const match = await bcrypt.compare(password, candidate.password);
        if(match) {
            const token = sign({
                id: candidate.id
            }, 'secret')
            res.json({
                token: token,
                username: candidate.username
            })
        }
    } else {
        console.log('not found')
        res.send({
            error: 'invalid  passwrod'
        })
    }
})

router.post('/register', async (req, res) => {
    
    const { username, password } = req.body;

    const candidate = await User.find({
        username: username
    })

    if (candidate.length) {
        res.json({
            error: 'user already exists'
        })
    } else {
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username: username,
            password: hashedPass
        })
        res.send(newUser)
    }

})


router.get('/auth', verifyToken, (req, res) => {
    res.send(req.user)
})


module.exports = router;
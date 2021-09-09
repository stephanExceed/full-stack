const { verify } = require('jsonwebtoken')


module.exports = function (req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        const decodedData = verify(token, 'secret')
        req.user = decodedData;
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
};
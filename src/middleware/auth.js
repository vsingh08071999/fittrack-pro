const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user_model')
const auth = async (req, res, next) => {
    try {
        console.log("-------------1")
        const token = req.header("Authorization").replace('Bearer ', '')
        console.log("-------------2")
        const decoded = jwt.verify(
            token, process.env.JWT_SECRET
        )
        console.log("-------------3")
        const user = await User.findById(decoded._id)
        console.log("-------------4")
        if (!user) {
        console.log("-------------5")
            throw new Error()
        }
        console.log("-------------6")
        req.token = token

        req.user = user

        next()

        console.log("-------------7")
    } catch (e) {
        console.log("Auth Failded:  ", e)
        res.status(401).send({
            error: 'Please authenticate.'
        })
    }
}

module.exports = auth
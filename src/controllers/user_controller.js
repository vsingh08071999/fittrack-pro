const User = require('../models/user_model')
const loginUser = async (req, res) => {
    try {
        // console.log('login user -----1')
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        )
        // console.log('login user -----2')
        const token = await user.generateAuthToken()
        // console.log('login user -----3')
        res.status(200).send({
            user,
            token
        })

        // console.log('login user -----4')
    } catch (e) {
        // console.log('login user -----5', e.message)
        res.status(400).send({ error: e.message })
    }
}
module.exports = {
    loginUser
}
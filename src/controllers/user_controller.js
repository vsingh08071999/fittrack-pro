const User = require('../models/user_model')

const signUpUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({
            email: req.body.email.toLowerCase().trim()
        })
        if (existingUser) {
            return res.status(400).send({
                error: "User already exist with this email Id."
            })
        }
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}

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

const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((item) => item.token !== req.token)
        await req.user.save()
        res.status(201).send({ message: 'Logout successful' })
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}

const getProfile = async (req, res) => {
    try {
        return res.status(200).send(req.user)
    } catch (e) {
        return res.status(400).send({
            error: e.message
        })
    }
}

const deleteProfile = async (req, res) => {
    try {
        const user = req.user
        await req.user.deleteOne()
        return res.status(200).send({
            message: "Your Profile has been deleted successfully.",
            user
        })
    } catch (e) {
        return res.status(400).send({
            error: e.message
        })
    }
}

const updateProfile = async (req, res) => {

    //     {
    //     "name": "Vishal Singh",
    //     "email": "vishalsingh@gmail.com",
    //     "password": "vishal12345" 
    // }
    try {
        const update = Object.keys(req.body)  // return keys of json body

        const allowedToUpdate = [
            'name', 'email', 'password'
        ]
        const isValidOperation = update.every((ele) => allowedToUpdate.includes(ele))  // return true only if all the conditions satisfied

        if (!isValidOperation) {
            return res.status(400).send({
                message: "Invalid Updates!"
            })
        }
        update.forEach((ele) => {
            req.user[ele] = req.body[ele]
        })
        await req.user.save()
        const user = req.user
        res.status(200).send({
            message: "Profile Updated Successfully!!",
            user
        })
    } catch (e) {
        return res.status(400).send({
            error: e.message
        })
    }
}


const logoutAllUser = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        return res.status(200).send({
            message: "Logout from all the devices successfully!!!"
        })
    } catch (e) {
        return res.status(400).send({
            error: e.message
        })
    }
}
module.exports = {
    signUpUser,
    loginUser,
    logoutUser,
    updateProfile,
    deleteProfile,
    getProfile,
    logoutAllUser
}
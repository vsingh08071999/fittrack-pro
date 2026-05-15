const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    }
})
userSchema.pre('save', async function () {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString()
    }, process.env.JWT_SECRET)
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Password is incorrect.')
    }

    return user
}
const User = mongoose.model('User', userSchema)
module.exports = User
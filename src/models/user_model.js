const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
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
        index: true,   //Create optimized search structure for this field
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    avatar: {
        type: Buffer // Store images as binary data
    },
    avatarContentType: {
        type: String
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
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
    user.tokens = user.tokens.concat({ token })
    await user.save()
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

userSchema.methods.toJSON = function () {   // Delete password & tokens from json response you get
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

const User = mongoose.model('User', userSchema)
module.exports = User
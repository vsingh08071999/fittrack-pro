const mongoose = require('mongoose')
const workoutSchema = mongoose.Schema({
    exercise: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    sets: {
        type: Number,
        required: true,
        min: 1
    },
    reps: {
        type: Number,
        required: true,
        min: 1
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
})

const Workout = mongoose.model('workout', workoutSchema)
module.exports = Workout
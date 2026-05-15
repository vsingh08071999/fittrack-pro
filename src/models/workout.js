const mongoose = require('mongoose')
const workoutSchema = mongoose.Schema({
    exercise: {
        type: String,
        required: true,
        trim: true
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
    }
})

const Workout = mongoose.model('workout', workoutSchema)
module.exports = Workout
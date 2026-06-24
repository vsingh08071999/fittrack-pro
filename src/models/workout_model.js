const mongoose = require('mongoose')
const workoutSchema = mongoose.Schema({
    exercise: {
        type: String,
        required: true,
        trim: true,
        index: true,
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
        index: true,
        ref: 'User'
    },
}, {
    timestamps: true
})
workoutSchema.index({     // MongoDB can jump directly to the finding part without scanning everything.
    owner: 1,
    excerise: 1
})

const Workout = mongoose.model('workout', workoutSchema)
module.exports = Workout
const workout = require('../utils/workout_opts')
const WorkoutModel = require('../models/workout_model')

// app.get('', (req, res) => {
//     res.send({
//         "Server is running on the port: ": port
//     })
// })

const getAllWorkout = async (req, res) => {
    try {
        // File System
        // const loadexercise = await workout.load_exercise()

        // MongoDB
        const sort = {}
        // http://localhost:3000/workout?sortBy=createdAt:asc
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }
        const limit = parseInt(req.query.limit)
        const skip = parseInt(req.query.skip)
        const workoutList = await WorkoutModel.find({ owner: req.user._id })
            .populate('owner', 'name email')
            .limit(limit).skip(skip).sort(sort)
        if (workoutList.length === 0) {
            return res.status(404).send({
                error: "Data not found!!!"
            })
        } else {
            return res.status(200).send(workoutList)
        }
    } catch (e) {
        res.status(500).send({
            error: "Internal server error"
        })
    }
}


const getWorkoutByName = async (req, res) => {
    try {
        // File System
        // console.log("Param is : " + req.params.exercise)
        // const data = await workout.readExercise(req.params.exercise)
        // res.send(data)

        // MongoDB
        const sort = {}
        console.log("Param is : " + req.params.exercise)
        console.log("Param is : " + req.query.sortBy)
        console.log("Param is : " + req.query.limit)
        console.log("Param is : " + req.query.skip)
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }
        const limit = parseInt(req.query.limit)
        const skip = parseInt(req.query.skip)
        const workout = await WorkoutModel.findOne({
            exercise: req.params.exercise,
            owner: req.user._id
        }).limit(limit).skip(skip).sort(sort)
        console.log("Return Data:  ", workout)
        if (!workout) {
            return res.status(404).send({
                error: "Workout not found"
            })
        }
        return res.status(200).send(workout)
    } catch (e) {
        res.status(500).send({
            error: "Internal server error"
        })
    }
}


const createWorkout = async (req, res) => {
    try {
        const { exercise, sets, reps } = req.body
        // MongoDB
        const existingExercise = await WorkoutModel.findOne({
            exercise: exercise,
            owner: req.user._id
        })
        if (existingExercise) {
            return res.status(400).send({
                'error': "Workout already exists"
            })
        }
        const workout = new WorkoutModel({
            ...req.body,
            owner: req.user._id
        })
        await workout.save()
        console.log("Saved Data in MongoDB:   ", workout)
        res.status(201).send(workout)

        // File System
        // const data = await workout.addExercise(exercise, sets, reps)
        // res.status(200).send({
        //     message: data
        // })
    } catch (e) {
        res.status(500).send({
            error: "Internal server error"
        })
    }
}

const deleteWorkout = async (req, res) => {
    try {
        // File System
        // console.log("Param is : " + req.params.exercise)
        // const data = await workout.removeExercise(req.params.exercise)
        // res.status(200).send({
        //     message: data
        // })

        // MongoDB
        const workout = await WorkoutModel.findOneAndDelete({
            exercise: req.params.exercise,
            owner: req.user._id
        })
        if (!workout) {
            return res.status(404).send({
                error: "Workout not found"
            })
        }
        return res.status(200).send({
            message: "Workout Deleted Successfully!!!"
        })
    } catch (e) {
        res.status(500).send({
            error: "Internal server error"
        })
    }
}


const updateWorkout = async (req, res) => {
    try {
        const { exercise, sets, reps } = req.body
        // File System
        // const data = await workout.updateExercise(exercise, sets, reps)
        // return res.status(200).send({
        //     message: data
        // })
        console.log("Exercise is :  " + exercise)
        // MongoDB
        const updatedWorkout = await WorkoutModel.findOneAndUpdate(
            {
                exercise: exercise,
                owner: req.user._id
            },
            {
                sets: sets,
                reps: reps
            },
            {
                // new: true,
                returnDocument: 'after',
                runValidators: true
            }

        )
        console.log("Updated Workout:   ", updatedWorkout)
        if (!updatedWorkout) {
            return res.status(404).send({
                error: 'Workout not found'
            })
        }
        return res.status(200).send({
            message: "Updated Successfully!!!",
            updatedWorkout
        })
    } catch (e) {
        return res.status(500).send({
            error: "Internal server error"
        })
    }
}



// yargs.parse()
// app.listen(port, () => {
//     console.log("Server is running on port:  " + port)
// })

module.exports = {
    getAllWorkoutData: getAllWorkout,
    getWorkoutByNameData: getWorkoutByName,
    updateWorkoutData: updateWorkout,
    deleteWorkoutData: deleteWorkout,
    createWorkoutData: createWorkout
}
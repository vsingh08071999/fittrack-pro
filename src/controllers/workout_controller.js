const workout = require('../utils/workout_opts')
const WorkoutModel = require('../models/workout')

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
        const workoutList = await WorkoutModel.find()
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
        const workout = await WorkoutModel.findOne({
            exercise: req.params.exercise
        })
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
        const workout = new WorkoutModel(req.body)
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
            exercise: req.params.exercise
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
                exercise: exercise
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
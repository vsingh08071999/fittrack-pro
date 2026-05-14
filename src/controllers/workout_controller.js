const workout = require('../utils/workout_opts')


// app.get('', (req, res) => {
//     res.send({
//         "Server is running on the port: ": port
//     })
// })

const getAllWorkout = async (req, res) => {
    try {
        const loadexercise = await workout.load_exercise()
        if (loadexercise.length === 0) {
            return res.status(404).send({
                error: "Data not found!!!"
            })
        } else {
            return res.status(200).send(loadexercise)
        }
    } catch (e) {
        res.status(500).send({
            error: "Inernal server error"
        })
    }
}


const getWorkoutByName = async (req, res) => {
    try {
        console.log("Param is : " + req.params.exercise)
        const data = await workout.readExercise(req.params.exercise)
        res.send(data)
    } catch (e) {
        res.status(500).send({
            error: "Inernal server error"
        })
    }
}


const createWorkout = async (req, res) => {
    try {
        const { exercise, sets, reps } = req.body
        // if (!exercise || !sets || !reps) {
        //     return res.status(400).send({
        //         error: "All fields are required."
        //     })
        // }
        // if (typeof exercise != 'string') {
        //     return res.status(400).send({
        //         error: "Exercise must be a string"
        //     })
        // }
        // if (typeof sets != 'number' || typeof reps != 'number') {
        //     return res.status(400).send({
        //         error: "Sets and reps must be number"
        //     })
        // }
        // if (sets <= 0 || reps <= 0) {
        //     return res.status(400).send({
        //         error: "Sets and reps must be greater than 0"
        //     })
        // }
        const data = await workout.addExercise(exercise, sets, reps)
        res.status(200).send({
            message: data
        })
    } catch (e) {
        res.status(500).send({
            error: "Inernal server error"
        })
    }
}

const deleteWorkout = async (req, res) => {
    try {
        console.log("Param is : " + req.params.exercise)
        const data = await workout.removeExercise(req.params.exercise)
        res.status(200).send({
            message: data
        })
    } catch (e) {
        res.status(500).send({
            error: "Inernal server error"
        })
    }
}


const updateWorkout = async (req, res) => {
    try {
        const { exercise, sets, reps } = req.body
        // if (!exercise || !sets || !reps) {
        //     return res.status(400).send({
        //         error: "All fields are required."
        //     })
        // }
        // if (typeof exercise != 'string') {
        //     return res.status(400).send({
        //         error: "Exercise must be a string"
        //     })
        // }
        // if (typeof sets != 'number' || typeof reps != 'number') {
        //     return res.status(400).send({
        //         error: "Sets and reps must be number"
        //     })
        // }
        // if (sets <= 0 || reps <= 0) {
        //     return res.status(400).send({
        //         error: "Sets and reps must be greater than 0"
        //     })
        // }

        const data = await workout.updateExercise(exercise, sets, reps)
        return res.status(200).send({
            message: data
        })
    } catch (e) {
        return res.status(500).send({
            error: "Inernal server error"
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
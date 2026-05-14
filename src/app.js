const express = require('express')
const app = express()
const workoutRoutes = require('./routes/workout_routes')
const mongoose = require('./db/mongoose')
app.use(express.json())
app.use(workoutRoutes)
const port = 3000
app.listen(port, () => {
    console.log("Server is running on the port: " + port)
})

// require('./commands/workout')
// const workout = require('./utils/workout_opts')
// // const yargs = require('yargs')
// const express = require('express')
// const app = express();
// app.use(express.json())
// const port = 3000

// app.get('', (req, res) => {
//     res.send({
//         "Server is running on the port: ": port
//     })
// })

// app.get('/workout', (req, res) => {
//     try {
//         const loadexercise = workout.load_exercise()
//         if (loadexercise.length === 0) {
//             return res.status(404).send({
//                 error: "Data not found!!!"
//             })
//         } else {
//             return res.status(200).send(loadexercise)
//         }
//     } catch (e) {
//         res.status(500).send({
//             error: "Inernal server error"
//         })
//     }
// })


// app.get('/workout/:exercise', (req, res) => {
//     try {
//         console.log("Param is : " + req.params.exercise)
//         const data = workout.readExercise(req.params.exercise)
//         res.send(data)
//     } catch (e) {
//         res.status(500).send({
//             error: "Inernal server error"
//         })
//     }
// })


// app.post('/workout', (req, res) => {
//     try {
//         const { exercise, sets, reps } = req.body
//         if (!exercise || !sets || !reps) {
//             return res.status(400).send({
//                 error: "All fields are required."
//             })
//         }
//         if (typeof exercise != 'string') {
//             return res.status(400).send({
//                 error: "Exercise must be a string"
//             })
//         }
//         if (typeof sets != 'number' || typeof reps != 'number') {
//             return res.status(400).send({
//                 error: "Sets and reps must be number"
//             })
//         }
//         if (sets <= 0 || reps <= 0) {
//             return res.status(400).send({
//                 error: "Sets and reps must be greater than 0"
//             })
//         }
//         const data = workout.addExercise(exercise, sets, reps)
//         res.status(200).send({
//             message: data
//         })
//     } catch (e) {
//         res.status(500).send({
//             error: "Inernal server error"
//         })
//     }
// })

// app.delete('/workout/:exercise', (req, res) => {
//     try {
//         console.log("Param is : " + req.params.exercise)
//         const data = workout.removeExercise(req.params.exercise)
//         res.status(200).send({
//             message: data
//         })
//     } catch (e) {
//         res.status(500).send({
//             error: "Inernal server error"
//         })
//     }
// })


// app.patch('/workout', (req, res) => {
//     try {
//         const { exercise, sets, reps } = req.body
//         if (!exercise || !sets || !reps) {
//             return res.status(400).send({
//                 error: "All fields are required."
//             })
//         }
//         if (typeof exercise != 'string') {
//             return res.status(400).send({
//                 error: "Exercise must be a string"
//             })
//         }
//         if (typeof sets != 'number' || typeof reps != 'number') {
//             return res.status(400).send({
//                 error: "Sets and reps must be number"
//             })
//         }
//         if (sets <= 0 || reps <= 0) {
//             return res.status(400).send({
//                 error: "Sets and reps must be greater than 0"
//             })
//         }

//         const data = workout.updateExercise(exercise, sets, reps)
//         return res.status(200).send({
//             message: data
//         })
//     } catch (e) {
//         return res.status(500).send({
//             error: "Inernal server error"
//         })
//     }
// })

// // yargs.parse()
// app.listen(port, () => {
//     console.log("Server is running on port:  " + port)
// })


// const express = require('express')
// const yargs = require('yargs')
// const { default: chalk } = require('chalk')
// const workout = require('./utils/workout_opts')

// const app = express();
// const port = 3000

// yargs.command({
//     command: 'add-workout',
//     describe: 'adding workout',
//     builder: {
//         exercise: {
//             describe: 'exercise name',
//             demandOption: true,
//             type: 'string'
//         },
//         sets: {
//             describe: 'no. of sets',
//             demandOption: true,
//             type: 'number'
//         },
//         reps: {
//             describe: 'no of reps',
//             demandOption: true,
//             type: 'number'
//         }
//     },
//     handler: function (argv) {
//         workout.addExercise(argv.exercise, argv.sets, argv.reps)
//         //         console.log(`
//         // ${workout.getWorkout()}
//         // Exercise Name: ${argv.exercise}
//         // Sets: ${argv.sets}
//         // Reps: ${argv.reps}
//         //         `)

//     }
// })

// yargs.command({
//     command: 'remove-workout',
//     describe: 'Remove a exercise',
//     builder: {
//         exercise: {
//             describe: "remove workout",
//             demandOption: true,
//             type: 'string'
//         }
//     },
//     handler: function (argv) {
//         workout.removeExercise(argv.exercise)
//     }
// })


// yargs.command({
//     command: 'read-workout',
//     describe: 'read a exercise',
//     builder: {
//         exercise: {
//             describe: "read workout",
//             demandOption: true,
//             type: 'string'
//         }
//     },
//     handler: function (argv) {
//         workout.readExercise(argv.exercise)
//     }
// })

// yargs.command({
//     command: "list-workout",
//     describe: 'List of exercise',
//     handler: function () {
//         workout.listExercise()
//     }
// })


// yargs.parse()

// app.get('', (req, res) => {
//     res.send("Fittrack Pro")
// })
// app.listen(port, () => {
//     console.log("Server is running on :" + port)
// })


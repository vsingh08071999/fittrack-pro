const yargs = require('yargs')
const { default: chalk } = require('chalk')
const workout = require('../utils/workout_opts')
yargs.command({
    command: 'add-workout',
    describe: 'adding workout',
    builder: {
        exercise: {
            describe: 'exercise name',
            demandOption: true,
            type: 'string'
        },
        sets: {
            describe: 'no. of sets',
            demandOption: true,
            type: 'number'
        },
        reps: {
            describe: 'no of reps',
            demandOption: true,
            type: 'number'
        }
    },
    handler: function (argv) {
        workout.addExercise(argv.exercise, argv.sets, argv.reps)
        //         console.log(`
        // ${workout.getWorkout()}
        // Exercise Name: ${argv.exercise}
        // Sets: ${argv.sets}
        // Reps: ${argv.reps}
        //         `)

    }
})

yargs.command({
    command: 'remove-workout',
    describe: 'Remove a exercise',
    builder: {
        exercise: {
            describe: "remove workout",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        workout.removeExercise(argv.exercise)
    }
})


yargs.command({
    command: 'read-workout',
    describe: 'read a exercise',
    builder: {
        exercise: {
            describe: "read workout",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        workout.readExercise(argv.exercise)
    }
})

yargs.command({
    command: "list-workout",
    describe: 'List of exercise',
    handler: function () {
        workout.listExercise()
    }
})


// yargs.parse()

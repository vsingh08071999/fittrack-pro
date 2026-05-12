const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const getworkout = function () {
    return "Your workout is ......"
}


const addexercise = function (exercise, sets, reps) {
    console.log(exercise + sets + reps)
    const loadexercise = loadExercise()
    // console.log("Exercise from file is : " + loadexercise)
    if (loadexercise.length === 0) {
        loadexercise.push({
            exercise: exercise,
            sets: sets,
            reps: reps
        })
        console.log(chalk.green("Exercise with exercise name : " + exercise + " added successfully!!"))
    } else {
        const duplicate = loadexercise.filter((item) => item.exercise === exercise)
        if (duplicate.length === 0) {
            loadexercise.push({
                exercise: exercise,
                sets: sets,
                reps: reps
            })
            console.log(chalk.green("Exercise with exercise name : " + exercise + "added successfully!!"))
        } else {
            console.log(chalk.red("Duplicate exercise with exercise name : " + exercise))
        }
    }
    saveExercise(loadexercise)
}


const removeexercise = function (exerciseName) {
    const loadexercise = loadExercise()
    if (loadexercise.find(item => item.exercise === exerciseName)) {
        const index = loadexercise.findIndex(note => note.exercise === exerciseName)
        if (index != -1) {
            loadexercise.splice(index)
            saveExercise(loadexercise)
            console.log(chalk.green("Exercise Deleted Successfully!!!"))
        }
    } else {
        console.log(chalk.red("Exercise not found!!!   Exercise: " + exerciseName))
    }

}

const readexercise = function (exerciseName) {
    const loadexercise = loadExercise()
    if (loadexercise.find((item) => item.exercise === exerciseName)) {
        console.log(chalk.green("Exercise is already exist!!!  " + exerciseName))
    } else {
        console.log(chalk.red("Exercise not found!!! : " + exerciseName))
    }
}

const listexercise = function () {
    const loadexercise = loadExercise()
    if (loadexercise.length === 0) {
        console.log(chalk.red("There is no item in the exercise."))
    } else {
        loadexercise.forEach(element => {
            console.log(element.exercise + " - " + element.sets + " X " + element.reps)
        });
    }
}

const saveExercise = function (exerciseList) {
    console.log("Save Exercise is : " + exerciseList)
    const stringBuffered = JSON.stringify(exerciseList)
    const filePath = path.join(__dirname, '../../data/workout.json')
    fs.writeFileSync(filePath, stringBuffered)
}

const loadExercise = function () {
    try {
        const filePath = path.join(__dirname, '../../data/workout.json')
        const buffered = fs.readFileSync(filePath).toString()
        return JSON.parse(buffered)
    } catch (e) {
        return []
    }
}



module.exports = {
    getWorkout: getworkout,
    addExercise: addexercise,
    removeExercise: removeexercise,
    readExercise: readexercise,
    listExercise: listexercise
}
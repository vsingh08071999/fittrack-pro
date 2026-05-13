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
        saveExercise(loadexercise)
        console.log(chalk.green("Exercise with exercise name : " + exercise + " added successfully!!"))
        return "Added Successfully!!!"
    } else {
        const duplicate = loadexercise.filter((item) => item.exercise === exercise)
        if (duplicate.length === 0) {
            loadexercise.push({
                exercise: exercise,
                sets: sets,
                reps: reps
            })
            saveExercise(loadexercise)
            console.log(chalk.green("Exercise with exercise name : " + exercise + "added successfully!!"))
            return "Added Successfully!!!"
        } else {
            console.log(chalk.red("Duplicate exercise with exercise name : " + exercise))
            return "Already exist with the same name of exercise."
        }
    }

}


const removeexercise = function (exerciseName) {
    const loadexercise = loadExercise()
    if (loadexercise.find(item => item.exercise.toLowerCase() === exerciseName.toLowerCase())) {
        // const index = loadexercise.findIndex(note => note.exercise.toLowerCase() === exerciseName.toLowerCase())
        // if (index != -1) {
        //     loadexercise.splice(index)
        //     saveExercise(loadexercise)
        //     console.log(chalk.green("Exercise Deleted Successfully!!!"))
        // }
        const updatedData = loadexercise.filter(item => item.exercise.toLowerCase() != exerciseName.toLowerCase())
        saveExercise(updatedData)
        return "Deleted Successfully!!!"
    } else {
        console.log(chalk.red("Exercise not found!!!   Exercise: " + exerciseName))
        return `There is no workout exercise with name of ${exerciseName}.`
    }

}


const updateexercise = function (exerciseName, sets, reps) {
    const loadexercise = loadExercise()
    if (loadexercise.find(item => item.exercise.toLowerCase() === exerciseName.toLowerCase())) {
        const index = loadexercise.findIndex(note => note.exercise.toLowerCase() === exerciseName.toLowerCase())
        if (index != -1) {
            loadexercise[index].exercise = exerciseName
            loadexercise[index].sets = sets
            loadexercise[index].reps = reps
            console.log(chalk.green("Exercise Updated Successfully!!!"))
        }
        saveExercise(loadexercise)
        return "Updated Successfully!!!"
    } else {
        console.log(chalk.red("Exercise not found!!!   Exercise: " + exerciseName))
        return `There is no workout exercise with name of ${exerciseName}.`
    }

}

const readexercise = function (exerciseName) {
    const loadexercise = loadExercise()
    const exerciseData = loadexercise.find((item) => item.exercise.toLowerCase() === exerciseName.toLowerCase())
    if (exerciseData === undefined) {
        return { message: "There is no exercise name in the list" }
    } else {
        return exerciseData
    }

}

const listexercise = function () {
    const loadexercise = loadExercise()
    if (loadexercise.length === 0) {
        console.log(chalk.red("There is no item in the exercise."))
    } else {
        return loadexercise
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
    listExercise: listexercise,
    load_exercise: loadExercise,
    updateExercise: updateexercise
}
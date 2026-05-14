const express = require('express')
const router = express.Router()
const controller = require('../controllers/workout_controller')
const validateWorkout = require('../middleware/validation')

router.get('/workout', controller.getAllWorkoutData)
router.get('/workout/:exercise', controller.getWorkoutByNameData)
router.post('/workout', validateWorkout, controller.createWorkoutData)
router.delete('/workout/:exercise', controller.deleteWorkoutData)
router.patch('/workout', validateWorkout, controller.updateWorkoutData)

module.exports = router


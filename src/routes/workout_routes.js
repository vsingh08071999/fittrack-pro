const express = require('express')
const router = express.Router()
const controller = require('../controllers/workout_controller')
const validateWorkout = require('../middleware/validation')
const auth = require('../middleware/auth')

router.get('/workout', auth, controller.getAllWorkoutData)
router.get('/workout/:exercise', auth, controller.getWorkoutByNameData)
router.post('/workout', validateWorkout, auth, controller.createWorkoutData)
router.delete('/workout/:exercise', auth, controller.deleteWorkoutData)
router.patch('/workout', validateWorkout, auth, controller.updateWorkoutData)

module.exports = router


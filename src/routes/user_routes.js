const express = require('express')
const router = express.Router()
const controller = require('../controllers/user_controller')
router.post('/user/login', controller.loginUser)
module.exports = router
const express = require('express')
const router = express.Router()
const multer = require('multer')
const controller = require('../controllers/user_controller')
const auth = require('../middleware/auth')
const validator = require('../middleware/validation')


const upload = multer({
    limits: {
        fileSize: 1000000 // 1MB size
    },
    fileFilter(req, file, cb) {
        console.log("Upload File------------ 1")
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {

            console.log("Upload File------------ 1")
            return cb(new Error('Please upload an image'))  // cb is callback method
        }
        return cb(undefined, true)
    }
})

router.post('/user/me/avatar', auth, upload.single('avatar'), controller.uploadAvatar)
router.post('/user/login', validator.validateSignin, controller.loginUser)
router.post('/user/logout', auth, controller.logoutUser)
router.post('/user/signup', validator.validateSignup, controller.signUpUser)
router.get('/user/stats', auth, controller.getUserStats)
router.get('/user/practiceUserStats', auth, controller.practiceUserMethods)
router.get('/user/me', auth, controller.getProfile)
router.patch('/user/me', validator.validateUpdateProfile, auth, controller.updateProfile)
router.delete('/user/me', auth, controller.deleteProfile)
router.post('/user/logoutAll', auth, controller.logoutAllUser)
module.exports = router
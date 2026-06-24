const express = require('express')
const router = express.Router()
const multer = require('multer')
const controller = require('../controllers/user_controller')
const auth = require('../middleware/auth')
const catchAsync = require('../utils/catch_async')
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

router.get('/user/:id/deleteAvatar',auth, catchAsync(controller.deleteAvatar))
router.get('/user/:id/getAvatar', catchAsync(controller.getAvatar))
router.post('/user/me/avatarBase64', auth, catchAsync(controller.uploadAvatarBase64))
router.get('/user/search', catchAsync(controller.getUserByName))
router.post('/user/me/avatar', auth, upload.single('avatar'), catchAsync(controller.uploadAvatar))
router.post('/user/login', validator.validateSignin, catchAsync(controller.loginUser))
router.post('/user/logout', auth, catchAsync(controller.logoutUser))
router.post('/user/signup', validator.validateSignup, catchAsync(controller.signUpUser))
router.get('/user/stats', auth, catchAsync(controller.getUserStats))
router.get('/user/practiceUserStats', auth, catchAsync(controller.practiceUserMethods))
router.get('/user/me', auth, catchAsync(controller.getProfile))
router.patch('/user/me', validator.validateUpdateProfile, auth, catchAsync(controller.updateProfile))
router.delete('/user/me', auth, catchAsync(controller.deleteProfile))
router.post('/user/logoutAll', auth, catchAsync(controller.logoutAllUser))
router.get('/user/search', catchAsync(controller.getUserByEmail))

module.exports = router
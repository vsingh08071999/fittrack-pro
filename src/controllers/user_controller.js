const User = require('../models/user_model')
const sharp = require('sharp')
const signUpUser = async (req, res) => {
    // try {
    const existingUser = await User.findOne({
        email: req.body.email.toLowerCase().trim()
    })
    if (existingUser) {
        return res.status(400).send({
            error: "User already exist with this email Id."
        })
    }
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({
        user,
        token
    })
    // } catch (e) {
    //     res.status(400).send({ error: e.message })
    // }
}

const loginUser = async (req, res) => {
    // try {
    // console.log('login user -----1')
    const user = await User.findByCredentials(
        req.body.email,
        req.body.password
    )
    // console.log('login user -----2')
    const token = await user.generateAuthToken()
    // console.log('login user -----3')
    res.status(200).send({
        user,
        token
    })

    // console.log('login user -----4')
    // } catch (e) {
    //     // console.log('login user -----5', e.message)
    //     res.status(400).send({ error: e.message })
    // }
}

const logoutUser = async (req, res) => {
    // try {
    req.user.tokens = req.user.tokens.filter((item) => item.token !== req.token)
    await req.user.save()
    res.status(201).send({ message: 'Logout successful' })
    // } catch (e) {
    //     res.status(400).send({ error: e.message })
    // }
}

const getProfile = async (req, res) => {
    // try {
    return res.status(200).send(req.user)
    // } catch (e) {
    // return res.status(400).send({
    //     error: e.message
    // })
    // }
    // throw new Error('Profile failed')
}

const deleteProfile = async (req, res) => {
    // try {
    const user = req.user
    await req.user.deleteOne()
    return res.status(200).send({
        message: "Your Profile has been deleted successfully.",
        user
    })
    // } catch (e) {
    //     return res.status(400).send({
    //         error: e.message
    //     })
    // }
}

const updateProfile = async (req, res) => {

    //     {
    //     "name": "Vishal Singh",
    //     "email": "vishalsingh@gmail.com",
    //     "password": "vishal12345" 
    // }
    // try {
    const update = Object.keys(req.body)  // return keys of json body

    const allowedToUpdate = [
        'name', 'email', 'password'
    ]
    const isValidOperation = update.every((ele) => allowedToUpdate.includes(ele))  // return true only if all the conditions satisfied

    if (!isValidOperation) {
        return res.status(400).send({
            message: "Invalid Updates!"
        })
    }
    update.forEach((ele) => {
        req.user[ele] = req.body[ele]
    })
    await req.user.save()
    const user = req.user
    res.status(200).send({
        message: "Profile Updated Successfully!!",
        user
    })
    // } catch (e) {
    //     return res.status(400).send({
    //         error: e.message
    //     })
    // }
}


const logoutAllUser = async (req, res) => {
    // try {
    req.user.tokens = []
    await req.user.save()
    return res.status(200).send({
        message: "Logout from all the devices successfully!!!"
    })
    // } catch (e) {
    //     return res.status(400).send({
    //         error: e.message
    //     })
    // }
}

const uploadAvatar = async (req, res) => {
    // try {
    console.log("FIle is : ")
    console.log(req.file)
    const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send({
        message: 'Avatar uploaded successfully'
    })
    // } catch (e) {
    //     return res.status(400).send({
    //         error: e.message
    //     })
    // }
}


const uploadAvatarBase64 = async (req, res) => {
    // try {
    // console.log("Base64 file is : ")
    // console.log(req.body.avatar)
    // console.log('BODY:', req.body)
    // console.log('TYPE:', typeof req.body)
    const buffer = Buffer.from(req.body.avatar, 'base64')
    const max_size = 1024 * 1024
    if (buffer.length > max_size) {
        throw new Error('Image must be less than 1 MB')
    }
    const allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg'
    ]
    if (!allowedTypes.includes(req.body.avatarContentType)) {
        throw new Error('Invalid image type')
    }
    req.user.avatar = buffer
    req.user.avatarContentType = req.body.avatarContentType
    await req.user.save()
    res.send({
        message: 'Avatar uploaded successfully'
    })
    // } catch (e) {
    //     return res.status(400).send({
    //         error: e.message
    //     })
    // }
}


const getAvatar = async (req, res) => {
    console.log("Get Avatar:")
    console.log(req.params.id)
    const user = await User.findById(req.params.id)
    if (!user || !user.avatar) {
        return res.status(404).send({
            error: 'Avatar not found'
        })
    }
    res.set('Content-Type', user.avatarContentType)
    res.status(200).send(user.avatar)
}

const deleteAvatar = async (req, res) => {
    console.log("Delete Avatar: ")
    const user = await req.user
    if (!user.avatar) {
        throw new Error('Avatar not found!!!')
    }
    user.avatar = null // or undefined You can pass
    await user.save()
    res.send({
        message: 'Avatar deleted successfully!!!'
    })
}

const practiceUserMethods = async (req, res) => {
    // try {
    const stats = await User.aggregate([
        {
            $match: {
                _id: req.user._id
            }

        },
        {
            $lookup: {
                from: 'workouts',
                localField: '_id',
                foreignField: 'owner',
                pipeline: [
                    // {
                    //     $match: {
                    //         reps: {
                    //             $gt: 10
                    //         }
                    //     }
                    // },
                    {
                        $addFields: {
                            totalVolume: {
                                $multiply: [
                                    '$reps', '$sets'
                                ]
                            }
                        }
                    },
                    {
                        $addFields: {
                            Rank: {
                                $switch: {
                                    branches: [
                                        {
                                            case: {
                                                $gt: ['$totalVolume', 80]
                                            },
                                            then: 'Elite'
                                        },
                                        {
                                            case: {
                                                $and: [
                                                    {
                                                        $lte: ['$totalVolume', 80]
                                                    },
                                                    {
                                                        $gte: ['$totalVolume', 50]
                                                    }
                                                ]
                                            },
                                            then: 'Pro'
                                        },
                                    ],
                                    default: 'Normal'
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            exercise: 1,
                            Rank: 1,
                            totalVolume: 1,
                            reps: 1,
                            sets: 1
                        }
                    }
                ],
                as: "Workouts"
            }
        },
        // {
        //     $unwind: '$Workouts'
        // },
        // {
        //     $addFields: {
        //         Workouts: {
        //             $filter: {
        //                 input: '$Workouts',
        //                 as: 'workout',
        //                 cond: {
        //                     $gt: ['$$workouts.reps', 10]
        //                 }
        //             }
        //         }
        //     }
        // },
        {
            $project: {
                _id: 0,
                name: 1,
                email: 1,
                Workouts: 1
            }
        },
    ])
    if (!stats) {
        return res.status(404).send({
            error: "Workout not found"
        })
    }
    return res.status(200).send(stats)
    // } catch (e) {
    //     res.status(500).send({
    //         error: "Internal server error"
    //     })
    // }
}


const getUserStats = async (req, res) => {
    // try {

    // | Syntax   | Meaning                    |
    // | -------  | -------------------------- |
    // | '$field' | READ value from field      |
    // | 'field'  | CREATE / MODIFY field name |


    const stats = await User.aggregate([
        {
            $match: {
                _id: req.user._id
            }
        },
        {
            $lookup: {
                from: 'workouts',  //  target collection name
                localField: '_id',  //  take _id from current collection  means User is current collection
                foreignField: 'owner',  // match against owner field in workouts collection
                pipeline: [  // run aggregation on joined collection
                    {
                        $project: {
                            _id: 0,  // 0 means hide
                            exercise: 1,  // 1 means show
                            sets: 1,
                            reps: 1
                        }
                    }
                ],
                as: 'Workouts'  //  store joined result inside workouts field
            }
        },
        {
            // Flow is: 
            // match
            // → lookup
            // → unwind
            // → project
            $unwind: '$Workouts'   // It breaks array into: separate documents
        },
        {
            $addFields: {
                totalReps: {
                    $multiply: [  //  Performs multiplication
                        '$Workouts.sets',
                        '$Workouts.reps'
                    ]
                }
            }
        },
        {
            $addFields: {   // create new field
                performance: {
                    $cond: {    //  conditions (if, else if)
                        if: {
                            $gte: ['$totalReps', 45]
                        },
                        then: 'Strong',
                        else: {
                            $cond: {
                                if: {
                                    $lte: ['$totalReps', 30]
                                },
                                then: 'Beginner',
                                else: 'Intermediate'
                            }
                        }
                    }
                }
            }
        },
        {
            $addFields: {
                performanceBySwitchCase: {
                    $switch: {
                        branches: [
                            {
                                case: {
                                    $lte: ['$totalReps', 25]
                                },
                                then: 'Beginner User'
                            },
                            {
                                case: {
                                    $and: [
                                        {
                                            $gt: ['$totalReps', 25]
                                        },
                                        {
                                            $lt: ['$totalReps', 40]
                                        }
                                    ]
                                },
                                then: 'Intermediate User'
                            },
                            {
                                case: {
                                    $and: [
                                        {
                                            $gte: ['$totalReps', 40]
                                        },
                                        {
                                            $lt: ['$totalReps', 60]
                                        }
                                    ]
                                },
                                then: "Strong User"
                            }
                        ],
                        default: 'Strongest User'
                    }
                }
            }
        },
        {
            $addFields: {   // modify existing field
                'Workouts.exercise': 'Over All'
            }
        },
        // {
        //     $addFields: {
        //         totalReps: {
        //             $multiply: [  //  Performs multiplication
        //                 '$Workouts.sets',
        //                 '$Workouts.reps'
        //             ]
        //         }
        //     }
        // },
        {
            $project: {
                _id: 0,
                name: 1,
                email: 1,
                Workouts: 1,
                performance: 1,
                performanceBySwitchCase: 1,
                totalReps: 1,
            }
        }
    ])

    console.log("Return Data:  ", stats)
    if (!stats) {
        return res.status(404).send({
            error: "Workout not found"
        })
    }
    return res.status(200).send(stats)
    // } catch (e) {
    //     res.status(500).send({
    //         error: "Internal server error"
    //     })
    // }
}

const getUserByEmail = async (req, res) => {
    const user = await User.find({
        email: req.body.email
    })
    if (user.length === 0) {
        return res.status(404).send({
            error: "User not found!!!"
        })
    }
    return res.status(200).send(user)
}

const getUserByName = async (req, res) => {
    console.log("Get User By Name Called: ")
    console.log("param is :  ", req.body.name)
    const user = await User.find({
        name: req.body.name
    })
    if (user.length === 0) {
        return res.status(404).send({
            error: "User not found!!!"
        })
    }
    return res.status(200).send(user)
}
module.exports = {
    signUpUser,
    loginUser,
    logoutUser,
    updateProfile,
    deleteProfile,
    getProfile,
    logoutAllUser,
    uploadAvatar,
    getUserStats,
    practiceUserMethods,
    getUserByEmail,
    getUserByName,
    uploadAvatarBase64,
    getAvatar,
    deleteAvatar
}
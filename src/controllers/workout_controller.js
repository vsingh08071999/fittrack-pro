const workout = require('../utils/workout_opts')
const WorkoutModel = require('../models/workout_model')

// app.get('', (req, res) => {
//     res.send({
//         "Server is running on the port: ": port
//     })
// })

const getAllWorkout = async (req, res) => {
    try {
        // File System
        // const loadexercise = await workout.load_exercise()

        // MongoDB
        const sort = {}
        // http://localhost:3000/workout?sortBy=createdAt:asc
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }
        const limit = parseInt(req.query.limit)
        const skip = parseInt(req.query.skip)
        const workoutList = await WorkoutModel.find({ owner: req.user._id })
            .populate('owner', 'name email')
            .limit(limit).skip(skip).sort(sort)
        if (workoutList.length === 0) {
            return res.status(404).send({
                error: "Data not found!!!"
            })
        } else {
            return res.status(200).send(workoutList)
        }
    } catch (e) {
        res.status(500).send({
            error: "Internal server error"
        })
    }
}


const practiceWorkoutMethods = async (req, res) => {
    try {
        const stats = await WorkoutModel.aggregate([
            {
                $match: {
                    owner: req.user._id,
                    //         // sets: {
                    //         //     $gt: 4
                    //         // }
                },
            },
            {
                $facet: {
                    RecentlyAdded: [
                        {
                            $sort: {
                                createdAt: -1
                            }
                        },
                        {
                            $limit: 3
                        }
                    ],
                    LastlyAdded: [
                        {
                            $sort: {
                                createdAt: 1
                            }
                        },
                        {
                            $limit: 3
                        }
                    ]

                }
            }

            // {
            //     $group: {
            //         _id: '$exercise',
            //         totalReps: {
            //             $sum: '$reps'
            //         }
            //     }
            // },
            // {
            //     $facet: {
            //         totalCount: [{
            //             $count: 'count'
            //         }],
            //         workoutData: [
            //             {
            //                 $sort: {
            //                     totalReps: -1
            //                 }
            //             },
            //             {
            //                 $skip: 5
            //             },
            //             {
            //                 $limit: 5
            //             },
            //             {
            //                 $project: {
            //                     _id: 1,
            //                     totalReps: 1
            //                 }
            //             }
            //         ],
            //         returnedCount: [
            //             {
            //                 $sort: {
            //                     totalReps: -1
            //                 }
            //             },
            //             {
            //                 $skip: 5
            //             },
            //             {
            //                 $limit: 5
            //             },
            //             {
            //                 $count: 'count'
            //             }
            //         ]
            //     }
            // }
            // {
            //     $project: {
            //         _id: 0,
            //         exercise: 1,
            //         sets: 1,
            //         reps: 1
            //     }
            // }
            // {
            //     $group: {
            //         _id: '$exercise',
            //         totalReps: {
            //             $sum: '$reps'
            //         },
            //         totalVolume: {
            //             $sum: {
            //                 $multiply: [
            //                     '$reps', '$sets'
            //                 ]
            //             }
            //         }
            //     }
            // },
            // {
            //     $addFields: {
            //         Levels: {
            //             $cond: {
            //                 if: {
            //                     $gt: ['$totalReps', 15]
            //                 },
            //                 then: "Advanced",
            //                 else: {
            //                     $cond: {
            //                         if: {
            //                             $gt: ['$totalReps', 10]
            //                         },
            //                         then: "Intermediate",
            //                         else: "Beginner"
            //                     }
            //                 }
            //             }

            //         }
            //     }
            // },


            // {
            //     $sort: {
            //         sets: -1
            //     }
            // }, {
            //     $limit: 6
            // },
            // {
            //     $project: {
            //         _id: 0,       //hide _id field
            //         exercise: 1,
            //         sets: 1
            //     }
            // }
            // {
            //     $facet: {
            //         totalCount: [
            //             {
            //                 $count: 'Workout count is : '
            //             }
            //         ],
            //         workoutList: [{
            //             $match: {
            //                 owner: req.user._id,
            //             }
            //         }
            //         ]
            //     }
            // },


            // {
            //     $group: {
            //         _id: '$exercise',
            //         'total sets performed': {
            //             $sum: '$sets'
            //         }
            //     }
            // }

            // $cond: { // condition will not workout because it use to modifly and create fields So it belongs inside: $project,  $addFields, $group
            //     if: {
            //         sets: {
            //             $gte: 4
            //         }
            //     },
            //     then: "Ripped Workout",
            //     else: "Not Ripped"
            // }


            // $addFields: {  // working fine
            //     WorkoutType: {
            //         $cond: {
            //             if: {
            //                 $gte: ['$sets', 5]
            //             },
            //             then: "Ripped Workout",
            //             else: "Not Ripped"
            //         }
            //     }
            // }

            // sets: {
            //     $gte: 4
            // }

            // }
            // }
        ])
        if (!stats) {
            return res.status(404).send({
                error: "Workout not found."
            })
        }
        return res.status(200).send(stats)
    } catch (e) {
        return res.status(500).send({
            error: 'Internal Server Error.'
        })
    }
}

const getWorkoutStats = async (req, res) => {
    try {

        //   match → group → sort → limit → project
        //   sort → skip → limit
        // | Situation          | Use       |
        // | ------------------ | --------- |
        // | Array filtering    | `$filter` |
        // | Document filtering | `$match`  |



        // | Stage        | Purpose              |
        // | ------------ | -------------------- |
        // | `$match`     | filter documents     |
        // | `$addFields` | create/modify fields |
        // | `$project`   | shape response       |
        // | `$group`     | aggregation          |
        // | `$cond`      | conditional logic    |

        const stats = await WorkoutModel.aggregate([

            // {
            //     $match: {  // works like a find()
            //         owner: req.user._id  // find with particular id coming from token
            //     }
            // },
            {
                $facet: {        //  single DB hit all analytics together
                    totalWorkout: [
                        { $count: 'count' }
                    ],
                    averageReps: [
                        {
                            $group: {
                                _id: null,  // treat all documents as one group
                                average: {
                                    $avg: '$reps'
                                }
                            }
                        }
                    ],
                    topExercises: [
                        {
                            $group: {
                                _id: '$exercise',
                                total: {
                                    $sum: 1
                                }
                            }
                        }, {
                            $sort: {
                                total: -1
                            }
                        }, {
                            $limit: 3
                        }
                    ],
                    filteredWorkout: [{
                        $match: {
                            sets: {
                                $gt: 4
                            }
                        }
                    }],
                },
            }
            // {
            //     $group: {   //  $group ALWAYS requires _id to group 
            //         _id: '$exercise',  // group by exercise name
            //         averageSets: {
            //             $avg: '$sets'
            //         }
            //     }
            // },
            // {
            //     $sort: {
            //         averageSets: -1, // -1 → descending (high to low) // 1 → ascending (low to high)
            //     }
            // },
            // {
            //     $skip: 2    //  Skip 2 items from the top recent items and then show remaining data
            // },
            // {
            //     $limit: 3  // limit must be after sorting to get top 3 recent data
            // },
            // {
            //     $project: {
            //         _id: 0,       //hide _id field
            //         exercise: '$_id',    //create new field called exercise using old _id value
            //         averageSets: 1,   //  keep this field
            //         performance: {
            //             $multiply: [
            //                 '$averageSets', 2   // averageReps × 2
            //             ]
            //         }
            //     }
            // }

            // {
            //     $count: 'totalWorkouts',  // count total no of workouts
            // },
            // {
            //     $group: {   // group by exercise field
            //         _id: '$exercise',  // group using exercise field
            //         totalExercise: {
            //             $sum: 1  // add 1 for every document
            //         }
            //     }
            // }
        ])
        console.log("Return Data:  ", stats)
        if (!stats) {
            return res.status(404).send({
                error: "Workout not found"
            })
        }
        return res.status(200).send(stats)
    } catch (e) {
        res.status(500).send({
            error: "Internal server error"
        })
    }
}


const getWorkoutByName = async (req, res) => {
    try {
        // File System
        // console.log("Param is : " + req.params.exercise)
        // const data = await workout.readExercise(req.params.exercise)
        // res.send(data)

        // MongoDB
        const sort = {}
        console.log("Param is : " + req.params.exercise)
        console.log("Param is : " + req.query.sortBy)
        console.log("Param is : " + req.query.limit)
        console.log("Param is : " + req.query.skip)
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }
        const limit = parseInt(req.query.limit)
        const skip = parseInt(req.query.skip)
        const workout = await WorkoutModel.findOne({
            exercise: req.params.exercise,
            owner: req.user._id
        }).limit(limit).skip(skip).sort(sort)
        console.log("Return Data:  ", workout)
        if (!workout) {
            return res.status(404).send({
                error: "Workout not found"
            })
        }
        return res.status(200).send(workout)
    } catch (e) {
        res.status(500).send({
            error: "Internal server error"
        })
    }
}


const createWorkout = async (req, res) => {
    try {
        const { exercise, sets, reps } = req.body
        // MongoDB
        const existingExercise = await WorkoutModel.findOne({
            exercise: exercise,
            owner: req.user._id
        })
        if (existingExercise) {
            return res.status(400).send({
                'error': "Workout already exists"
            })
        }
        const workout = new WorkoutModel({
            ...req.body,
            owner: req.user._id
        })
        await workout.save()
        console.log("Saved Data in MongoDB:   ", workout)
        res.status(201).send(workout)

        // File System
        // const data = await workout.addExercise(exercise, sets, reps)
        // res.status(200).send({
        //     message: data
        // })
    } catch (e) {
        res.status(500).send({
            error: "Internal server error"
        })
    }
}

const deleteWorkout = async (req, res) => {
    try {
        // File System
        // console.log("Param is : " + req.params.exercise)
        // const data = await workout.removeExercise(req.params.exercise)
        // res.status(200).send({
        //     message: data
        // })

        // MongoDB
        const workout = await WorkoutModel.findOneAndDelete({
            exercise: req.params.exercise,
            owner: req.user._id
        })
        if (!workout) {
            return res.status(404).send({
                error: "Workout not found"
            })
        }
        return res.status(200).send({
            message: "Workout Deleted Successfully!!!"
        })
    } catch (e) {
        res.status(500).send({
            error: "Internal server error"
        })
    }
}


const updateWorkout = async (req, res) => {
    try {
        const { exercise, sets, reps } = req.body
        // File System
        // const data = await workout.updateExercise(exercise, sets, reps)
        // return res.status(200).send({
        //     message: data
        // })
        console.log("Exercise is :  " + exercise)
        // MongoDB
        const updatedWorkout = await WorkoutModel.findOneAndUpdate(
            {
                exercise: exercise,
                owner: req.user._id
            },
            {
                sets: sets,
                reps: reps
            },
            {
                // new: true,
                returnDocument: 'after',
                runValidators: true
            }

        )
        console.log("Updated Workout:   ", updatedWorkout)
        if (!updatedWorkout) {
            return res.status(404).send({
                error: 'Workout not found'
            })
        }
        return res.status(200).send({
            message: "Updated Successfully!!!",
            updatedWorkout
        })
    } catch (e) {
        return res.status(500).send({
            error: "Internal server error"
        })
    }
}



// yargs.parse()
// app.listen(port, () => {
//     console.log("Server is running on port:  " + port)
// })

module.exports = {
    getAllWorkoutData: getAllWorkout,
    getWorkoutByNameData: getWorkoutByName,
    updateWorkoutData: updateWorkout,
    deleteWorkoutData: deleteWorkout,
    createWorkoutData: createWorkout,
    getWorkoutStats,
    practiceWorkoutMethods
}
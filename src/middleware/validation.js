const validateWorkout = (req, res, next) => {
    const { exercise, sets, reps } = req.body
    if (!exercise || !sets || !reps) {
        return res.status(400).send({
            error: "All fields are required."
        })
    }
    if (typeof exercise != 'string') {
        return res.status(400).send({
            error: "Exercise must be a string"
        })
    }
    if (typeof sets != 'number' || typeof reps != 'number') {
        return res.status(400).send({
            error: "Sets and reps must be number"
        })
    }
    if (sets <= 0 || reps <= 0) {
        return res.status(400).send({
            error: "Sets and reps must be greater than 0"
        })
    }
    next()
}

const validateSignup = (req, res, next) => {
    // console.log("Sign Up : ")
    const { name, email, password } = req.body
    // console.log("Sign Up : ", req.body)
    if (!name || !email || !password) {
        return res.status(400).send({
            error: "All fields are required."
        })
    }
    if (password.length < 6) {
        return res.status(400).send({
            error: "Password should be 6 characters atleast."
        })
    }
    if (typeof name != 'string') {
        return res.status(400).send({
            error: "Name must be a string"
        })
    }
    next()
}

const validateSignin = (req, res, next) => {
    console.log("Inside signin validation:  ")
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({
            error: "All fields are required."
        })
    }
    if (password.length < 6) {
        return res.status(400).send({
            error: "Password should be 6 characters atleast."
        })
    }
    next()
}

const validateUpdateProfile = (req, res, next) => {
    const updates = Object.keys(req.body || {})
    if (updates.length === 0) {
        return res.status(400).send({
            error: 'At least one field is required.'
        })
    }
    if (req.body.password && req.body.password.length < 6) {

        return res.status(400).send({
            error: 'Password should be at least 6 characters.'
        })
    }
    next()
}

module.exports = {
    validateWorkout,
    validateSignin,
    validateSignup,
    validateUpdateProfile
}
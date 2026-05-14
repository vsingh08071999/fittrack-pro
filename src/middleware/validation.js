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

module.exports = validateWorkout
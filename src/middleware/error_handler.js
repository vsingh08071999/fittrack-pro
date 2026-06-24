const errorHandler = (err, req, res, next) => {
    console.log('Error Handler Executed')
    if (err.name == 'ValidationError') {
        return res.status(400).send({
            error: err.message
                || "Internal Server Error"
        })
    }
    if (err.code == 11000) {
        return res.status(400).send({
            error: "Email already exist!!"
        })
    }
    res.status(500).send({
        error: err.message
            || "Internal Server Error"
    })

}

module.exports = errorHandler
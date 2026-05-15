const mongoose = require('mongoose')
require('dotenv').config()
const mongo_db_url = process.env.MONGO_URI;
mongoose.connect(mongo_db_url,
    {
        serverSelectionTimeoutMS: 5000
    }
).then(() => {
    console.log("MongoDB Connected")
})
    .catch((e) => {
        console.log("Connection Error:", e)
    })
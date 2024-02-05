const mongoose = require('mongoose')


//Schema
const userScehema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String
    }

},
    {
        timestamps: true
    })

const User = mongoose.model("user", userScehema)

module.exports = User
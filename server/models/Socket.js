const mongoose = require('mongoose')

const socketSchema = new mongoose.Schema(
    {
        socketId:{
            type: String,
            required: true
        },
        userId:{
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("socket" , socketSchema)
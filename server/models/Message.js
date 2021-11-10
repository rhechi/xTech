const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
    {
        conversationID:{
            type:String,
            required: true,
        },
        sender:{
            type:String,
            required: true,
        },
        text:{
            type:String
        },
        seen:{
            type: Boolean,
            default: false,
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Message" , MessageSchema)
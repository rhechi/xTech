const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    firstName:{
        type:String,
        required: true,
        max:20
    },
    lastName:{
        type:String,
        required: true,
        max:20
    },
    email:{
        type:String,
        required: true,
        unique:true,
        max:30
    },
    password:{
        type:String,
        required: true,
        min: 6
    },
    profilePicture:{
        type: String,
    },
    contacts:{
        type:Array,
        default:[]
    },
    requests:{
        type:Array,
        default:[]
    },
    sentRequests: {
        type:Array,
        default: [],
    },
    rooms:{
        type:Array,
        default:[],
    },
    status:{
        type:Number,
        enum: [0,1,2],
        default: 0
    }
    
},
{timestamps: true})

module.exports = mongoose.model("User", UserSchema);
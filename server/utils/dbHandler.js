const mongoose = require('mongoose')
const User = require('../models/User')
const Conv = require('../models/Conv')
const Message = require('../models/Message')
const Token = require('../models/Token')


const connect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: true
        })
        console.log(`MongoDb connected: ${connect.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

//auth operations:
//register
const regsiter = async (payload) =>{
try {
    const user = await new User(payload)
    const res = await user.save()
    if(res){return res}else{ throw "internal error @registerDB" }
} catch (err) {
    return {error}
}
}



const getByEmail = async (email) =>{
    try {
        const res = await User.findOne({email:email})
        if(res){return res}else{ throw "uregistered email" }
    } catch (error) {
        return {error}
    }
}
const getById = async (id) =>{
    try {
        const res = await User.findOne({_id:id})
        if(res){return res}else{ throw "no user with this id" }
    } catch (error) {
        return {error}
    }
}

const updateUser = async (id,update) =>{
    try {
        const res = await User.findOneAndUpdate({id:id},{$set:update})
        if(res){return res}else{ throw "cannot update user" }
        
    } catch (error) {
        return {error}
    }
}

const getMessages = async (conversationID) => {
    try {
     
        const res = await Message.find({conversationID})
        if(res){return res}else{ throw "cannot get messages" }
    } catch (error) {
        return {error}
    }
    }
        const getUnseenMessages = async(senderId,convId) =>{
            try {
                const res = await Message.find({conversationID: convId,
                    sender:senderId, 
                    seen:false})
                    return res
            } catch (error) {
                return {error}
            }
        }
    const setMessage = async (message) => {
        const msg = new Message(message)
        try {
            const res = await msg.save()
            if(res){return res}else{ throw "cannot set this message" }
        } catch (error) {
            return {error}
        }
        }
        const seeMessage = async(id) =>{
            try {
                const res = await Message.findOneAndUpdate({_id:id},{$set:{seen:true}})
                if(res){return res}else{throw "cannot update message"}
            } catch (error) {
                return {error}
            }
        }
    const getConvs = async (id) => {
     
        try {
            const res = await Conv.find({members : {$in:id}})
            if(res){return res}else{ throw "cannot get conversations" }
        } catch (error) {
            return {error}
        }
    }

    const getLastMessage= async (convId) => {
        try {
            const res = await Message.find({conversationID:convId}).sort({createdAt:-1}).limit(1)
            if(res){return res}else{ throw "cannot get last message of conversations" }
        } catch (error) {
            console.log(error)
            return {error}
        }
    }

        const setConv = async (members) => {
            const conv = new Conv( members )
            try {
                const res = await conv.save()
                if(res){return res}else{ throw "cannot add this conversation" }
            } catch (error) {
                return {error}
            }
            }

            const addToken = async (token) => {
                const newToken = new Token({token})
                try {
                    const res = await newToken.save()
                    if(res){return res}else{ throw "cannot add this token" }
                } catch (error) {
                    return {error}
                }
                }
                const deleteToken = async (token) => {
                    try {
                        const res = await Token.findOneAndDelete(token)
                        //check response for delete
                        return res
                    } catch (error) {
                        return {error}
                    }
                    }



                    const getToken = async (token) => {
                        try {
                            const res = await Token.findOne({token})
                            if(res){return true}else{throw "none"}
                            } catch (error) {
                            return{error}
                        }
                        }
    const search = async(string)=>{
        try {
            string = string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`^${string}.*$`, 'i');
        const res = await User.find({firstName: regex})
        return res
        } catch (error) {
            return {error}
        }

    }           


                        /*
const name = async () => {
    try {
        const res = await 
        return res
    } catch (err) {
        console.log(err)
        return null
    }
    }
*/
exports.searchDB = search
exports.getUnseenMessagesDB = getUnseenMessages
exports.seeMessageDB = seeMessage
exports.getTokenDB = getToken
exports.deleteTokenDB = deleteToken
exports.addTokenDB = addToken
exports.setConvDB = setConv
exports.getConvsDB = getConvs
exports.getLastMessageDB = getLastMessage
exports.setMessageDB = setMessage
exports.getMessagesDB = getMessages
exports.updateUserDB = updateUser
exports.getByIdDB = getById
exports.getByEmailDB = getByEmail
exports.registerDB = regsiter
exports.connectDB = connect
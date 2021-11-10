const Socket = require('../../models/Socket')
const { deleteTokenDB } = require('../dbHandler')

 const addSocket = async (socket) =>{
    const newSocket = new Socket(socket)
    try {
        const res = await newSocket.save()
        if(res){return res}else{throw "Problem with saving socket"}
    } catch (error) {
        return {error}
    }
}
exports.addSocket = addSocket

 const deleteSocket = async (socketId)=>{
    try {
        const res = await Socket.findOneAndDelete({socketId})
        return res
    } catch (error) {
        return {error}
    }
}
exports.deleteSocket = deleteSocket
 const getSockets = async (userId) =>{
    try {
        const res = await Socket.find({userId})
        if(res){return res}else{ throw "No sockets for this id" }
    } catch (error) {
        return {error}
    } 
     
}
exports.getSockets = getSockets
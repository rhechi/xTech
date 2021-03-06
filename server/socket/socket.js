const { addSocket , deleteSocket , getSockets} = require("../utils/dbHandler/socket") ;
const { seeMessageDB , getUnseenMessagesDB } = require('../utils/dbHandler')
const io = require("socket.io")(8000,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let users = [];
const add = (id, socket) =>{
    !users.some(user=>user.id === id) && users.push({id,socket})
}
const remove = (socketId) =>{
    users = users.filter(user => user.socket != socketId)
}

const getUser = (userId) =>{
    return users.find(user=>user.id == userId)
}


io.on('connection', (socket) => {
    socket.on("init", async id =>{
        const cSockets = await getSockets(id)
        if(cSockets.length > 0 && socket){
            console.log(cSockets)
            if(cSockets.filter(s=>s.socketId == socket.id).length > 0){
                const res = await addSocket({socketId: socket.id,userId: id})
                res.error && console.log(res.error)
            }
        }
        const res = await addSocket({socketId: socket.id,userId: id})
        res.error && console.log(res.error)
        
    })
    //disconnect
    socket.on("disconnect" , async ()=>{
        console.log("disconnected")
        const res = await deleteSocket(socket.id)
        io.emit("getUsers",users)
    })
    //send and get msg
    socket.on("sendMessage", async ({message,recieverId}) =>{
        console.log("sending message")
        const recieverSockets = await getSockets(recieverId)
        console.log("reciever sockets", recieverSockets)
        if(recieverSockets.length == 0){console.log("no sockets to send to")}
        if(recieverSockets && !recieverSockets.error && recieverSockets.length > 0){
            recieverSockets.forEach(s=>{
                console.log("sending message to socket")
                io.to(s.socketId).emit("getMessage",message)
            })
        }
    })
    //add a new contact/conversation
    socket.on("addConv", async({convId,senderId,recieverId})=>{
        try {
            const recieverSockets = await getSockets(recieverId)
            if(recieverSockets && !recieverSockets.error && recieverSockets.length > 0){
                recieverSockets.forEach(s=>{
                    io.to(s.socketId).emit("getConv")
                })
            }
        } catch (error) {
            console.log(error)
        }
    })

    //seen
    socket.on("seen", async({id,convId,friendId})=>{
        try {
            const recieverSockets = await getSockets(friendId)
            if(recieverSockets && !recieverSockets.error && recieverSockets.length > 0){
                recieverSockets.forEach(s=>{
                    console.log("sending message to socket")
                    io.to(s.socketId).emit("seen",convId)
                })
            }
        } catch (error) {
            console.log(error)
        }
        try {
            const messages = await getUnseenMessagesDB(friendId,convId)
            if(messages.error){throw error}
            messages.forEach(message =>{
                try {
                    seeMessageDB(message._id)
                } catch (error) {
                    console.log(error)
                }
            })
        } catch (error) {
            console.log("socket seen", error)
        }
    })

    
})
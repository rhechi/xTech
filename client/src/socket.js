import { io } from "socket.io-client"
const host = "ws://localhost:8000"
const  socket = io(host)
export const socketInit = (userId) =>{
    console.log(userId)
    socket.emit("init", userId)
}
export default socket


import axios from 'axios'
import { getMessagesStart , getMessagesSuccess , getMessagesFail , addMessage } from '../redux/messageSlice'

export const getMessagesCall = async (payload,dispatch) =>{
    dispatch(getMessagesStart())
    try {
        //make request to get messages where convId is the same as payload is the convId
        const res = await axios.get(`/message/${payload.convId}`)
        const messages = res.data
        //after resposnse from server
        messages.forEach(m=>{ if(payload.user.id == m.sender){ m.own = true }else{ m.own = false } })
        dispatch(getMessagesSuccess({messages}))
    } catch (error) {
        dispatch(getMessagesFail({error}))
    }
}

export const sendMessageCall = async (payload,socket,dispatch) =>{
    const message = payload.message
    try {
        const res = await axios.post("/message",message);
        socket.emit("sendMessage",{
            message,
            recieverId: payload.friendId,
            createdAt: Date.now()
        })
        dispatch(addMessage(message))
    } catch (error) {
        console.log("add message call",error)
    }
}
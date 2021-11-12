import axios from 'axios'
import { getMessagesStart , getMessagesSuccess , getMessagesFail , addMessage } from '../redux/messageSlice'
import{ socket } from '../socket'

export const getMessagesCall = async (payload,dispatch) =>{
    dispatch(getMessagesStart())
    try {
        const res = await axios.get(`/message/${payload.convId}`)
        const messages = res.data
        dispatch(getMessagesSuccess({messages}))
    } catch (error) {
        dispatch(getMessagesFail({error}))
    }
}
export const sendMessageCall = async (payload,dispatch) =>{
    const message = payload.message
    try {
        await axios.post("/message",message);
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
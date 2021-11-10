import { useEffect } from 'react'
import { useDispatch , useSelector } from "react-redux"
import { getConvsSuccess } from "../redux/convSlice"
import { seeMessage , addMessage } from '../redux/messageSlice'


export const SocketMg = () => {
    const socket = useSelector(state=>state.socket.current)
    const dispatch = useDispatch()
    const convs = useSelector(state=>state.conv.current)
    const activeConv = useSelector(state=>state.conv.active)
    useEffect(()=>{
        socket.on("getMessage",message=>{
            console.log(message)
            // convs.forEach((conv, index) => {
            //     if(conv.convId === message.conversationID) {
            //         convs[index].lastMessage = message;
            //     }
            // })
            //dispatch(getConvsSuccess(convs))
            console.log(activeConv)
            console.log(message.conversationID)
            if(activeConv?.convId == message.conversationID){
                dispatch(addMessage(message))
            }
        })

        // socket.on("seen", convId=>{
        //     convs.forEach((conv, index) => {
        //         if(conv.convId == convId){
        //             convs[index].lastMessage.seen = true
        //         }
        //     })
        //     dispatch(getConvsSuccess(convs))
        //     if(activeConv?.convId == convId){
        //         dispatch(seeMessage())
        //     }
        // })
    },[socket])
    return (
        <></>
    )
}


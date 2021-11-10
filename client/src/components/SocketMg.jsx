import { useEffect } from 'react'
import { useDispatch , useSelector } from "react-redux"
import { getConvsSuccess } from "../redux/convSlice"
import { seeMessage , addMessage } from '../redux/messageSlice'


export const SocketMg = () => {
    const socket = useSelector(state=>state.socket.current)
    const dispatch = useDispatch()
    const convs = useSelector(state=>state.conv.current)
    const activeConv = useSelector(state=>state.conv.active)
    //console.log(activeConv)
    useEffect(()=>{
        socket.on("getMessage",message=>{
           // console.log(message)
           const newConvs = convs.map(c=>(
                c.convId == message.conversationID ? {
                    convId: c.convId,
                    friendId: c.friendId,
                    firstName: c.firstName,
                    convImg: c.convImg,
                    lastName: c.lastName,
                    lastMessage: message
                 }:  c
           ))
           console.log("newConvs",newConvs)
            if(newConvs.length == convs.length){dispatch(getConvsSuccess(newConvs))}
            //console.log(activeConv)
           // console.log(message.conversationID)
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
    },[activeConv])
    return (
        <></>
    )
}


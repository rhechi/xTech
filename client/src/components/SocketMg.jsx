import { useEffect } from 'react'
import { useDispatch , useSelector } from "react-redux"
import {  updateConv } from "../redux/convSlice"
import { addMessage } from '../redux/messageSlice'
import { socket } from '../socket'





export const SocketMg = () => {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user.login.info)  
    const activeConv = useSelector(state=>state.conv.active)
    useEffect(()=>{
            
            socket.emit("init", user.id)
           
          
           
       

      },[])
    useEffect(()=>{
        socket.on("getMessage",message=>{
          
            dispatch(updateConv(message))
         
            if(activeConv?.convId === message.conversationID){
                dispatch(addMessage(message))
            }
        // })

        // socket.on("seen", convId=>{
        //     
        //     })
        //     dispatch(updateConv(message))
        //     if(activeConv?.convId == convId){
        //         dispatch(seeMessage())
        //     }
         })
    },[activeConv])
    return (
        <></>
    )
}


import { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { sendMessageCall } from '../api/messageCall'
import { userSlice } from '../redux/userSlice'

function ChatFrom() {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user.login.info)
    const currentChat = useSelector(state=>state.conv.active)
    const [newMessage,setNewMessage] = useState("")
    const onChange =  (e) =>{
        setNewMessage(e.target.value)
        // socket.emit("typing",{
        //     senderId: user.id,
        //     recieverId: currentChat.friendId
        // })
    }
    const onSubmit = async (e) =>{
        e.preventDefault()
        if(newMessage && newMessage !== ""){
        const message ={
            conversationID: currentChat?.convId,
            sender: user?.id,
            text: newMessage
            }
            console.log(currentChat)
            await sendMessageCall({user,message,friendId:currentChat.friendId},dispatch)
            setNewMessage("")

        }
    }

    return (
         <div>

        { currentChat?

            <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={onChange}
              value={newMessage}
            />
            <button className="btnSendMsg" id="sendMsgBtn">
              <i className="fa fa-paper-plane"></i>
            </button>

            </form>
          </div>
        </div>


// asdad----------------------------------------------------------------------------------------

            // <form className="chatBoxBottom" onSubmit={onSubmit}>
            // <input onChange={onChange} value={newMessage} type="text" className="chatMessageInput" placeholder="write text here"/>
            // <button className="chatSubmitButton" type="submit">Send</button>
            // </form>
        
    : <></>}
    
    </div>
    )
}

export


default ChatFrom

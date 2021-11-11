import '../styles/chat.css'
import { Fragment } from 'react'
import ConvBox from '../components/ConvBox'
import ChatBox from '../components/ChatBox'
import SideBar from '../components/SideBar'
import { SocketMg } from '../components/SocketMg'
import { useState } from 'react'

function Chat() {
    const [currentChat,setCurrentChat] = useState(null)
    
    return (
        <div className="__main">
            
            <div className="main__chatbody">
                <ConvBox/>
                <ChatBox />
                <SideBar />
        </div>
        <SocketMg />
        </div>
    )
}

export default Chat

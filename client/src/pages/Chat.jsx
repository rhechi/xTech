import '../styles/chat.css'
import { Fragment } from 'react'
import ConvBox from '../components/ConvBox'
import ChatBox from '../components/ChatBox'
import { SocketMg } from '../components/SocketMg'
import { useState } from 'react'

function Chat() {
    const [currentChat,setCurrentChat] = useState(null)
    
    return (
        <div className="__main">
            <SocketMg />
            <div className="main__chatbody">
                <ConvBox/>
                <ChatBox />

       

        </div>
        </div>
    )
}

export default Chat

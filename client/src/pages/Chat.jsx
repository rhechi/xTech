import '../styles/chat.css'
import ConvBox from '../components/ConvBox'
import ChatBox from '../components/ChatBox'
import SideBar from '../components/SideBar'
import { SocketMg } from '../components/SocketMg'


function Chat() {
    return (
        <div className="chatPage">
            
            <div className="chatContainer">
                <ConvBox/>
                <ChatBox />
                <SideBar />
        </div>
        <SocketMg />
        </div>
    )
}

export default Chat

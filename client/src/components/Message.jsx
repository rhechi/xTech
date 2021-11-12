import '../styles/message.css'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'

function Message({message , img}) {
    const userId = useSelector(state=>state.user.login.info?.id)
    const own = userId === message.sender
    const time = message.createdAt
 
    return (
        <div className={`messageContainer ${own? "me" : "other"}`}>
        <div className="messageContent">
          <div className="messageText">{message.text}</div>
          <div className="messageInfo">
            <span>{format(time)}</span>
          </div>
        </div>
        <div className="avatar" style={own ? {display: "none"}: {}}>
            <div className="avatar img">
                <img  src={img} alt="" />

            </div>

        </div>
        </div>
    )
}

export default Message

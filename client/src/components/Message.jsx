import '../styles/message.css'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'

function Message({message , img}) {
    const userId = useSelector(state=>state.user.login.info?.id)
    const own = userId == message.sender
    const time = message.createdAt
 
    return (
        <div className={`chat__item ${own? "me" : "other"}`}>
             <div className="chat__item__content">
          <div className="chat__msg">{message.text}</div>
          <div className="chat__meta">
            <span>{format(time)}</span>
            {/* <span>Seen 1.03PM</span> */}
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

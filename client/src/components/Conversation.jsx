import '../styles/conversation.css'
import { capitalize } from '../utils'
import { format } from 'timeago.js'



  function Conversation({conv}) {
    const convName = `${capitalize(conv.firstName)} ${capitalize(conv.lastName)}`
    const convImg = conv.convImg
    const seen = conv?.lastMessage?.seen;
    const time = conv?.lastMessage?.createdAt
  
    
      return (
        <div  className="conversation">
          <div className="avatar">
        <div className="avatar-img">
          <img src={convImg} alt="" />
        </div>
        <span className={`isOnline active`}></span>
      </div>
      <div className="info">
          <p className="name">{convName}</p>
          <p className={seen?"seen":"unseen"}>{conv?.lastMessage?.text.split("").length < 10 ? (conv.lastMessage.text) : "..." }</p>
          <span >{format(time)}</span>
        </div>
        
    </div>
      )
  }
  
  export default Conversation
  
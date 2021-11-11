import '../styles/conversation.css'
import { useSelector , useDispatch } from 'react-redux'
import { useEffect , useState } from 'react'
import { getConvCall } from '../api/apiCalls'
import { format } from 'timeago.js'



  function Conversation({conv}) {
    const user = useSelector(state=>state.user.login.info)
    const convName = `${conv.firstName} ${conv.lastName}`
    const convImg = conv.convImg
    const seen = conv?.lastMessage?.seen;
    const time = conv?.lastMessage?.createdAt
  
    
      return (
        <div className="chatlist__item">
          <div className="avatar">
        <div className="avatar-img">
          <img src={convImg} alt="" />
        </div>
        <span className={`isOnline active`}></span>
      </div>
      <div className="userMeta">
          <p>{convName}</p>
          <span >{format(time)}</span>
        </div>
        <span className={seen?"seen":"unseen"}>{conv?.lastMessage?.text}</span>
    </div>
      )
  }
  
  export default Conversation
  
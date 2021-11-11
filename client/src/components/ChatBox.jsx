import '../styles/chatBox.css'
import { useEffect, useRef } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import Message from '../components/Message'
import ChatForm from '../components/ChatFrom'
import { getMessageCall, getMessagesCall } from '../api/messageCall'
//import socket from '../socket'
import { addMessage } from '../redux/messageSlice'

function ChatBox() {
    const socket = useSelector(state=>state.socket.current)
    const scrollRef = useRef()
    const user = useSelector(state=>state.user.login.info)
    const conv = useSelector(state=>state.conv.active)
    const image = useSelector(state=>state.conv.active?.convImg)
    const messages = useSelector(state=>state.message.current.messages)
    const loading = useSelector(state=>state.message.loading)
    //console.log(messages)
    
    const dispatch = useDispatch()
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    },[messages])
    useEffect(()=>{
        const getMessages = async (payload) =>{
            await getMessagesCall(payload,dispatch)
        }
        if(conv){
               // console.log(conv)
               const  payload = {user,convId:conv.convId}
                
            getMessages(payload)

        }
    },[conv,user])
    return (
        
            <div className="main__chatcontent">
                
            {
                        conv ? <>
                      <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
            <div className="avatar">
        <div className="avatar-img">
          <img src={conv.convImg} alt="#" />
        </div>
        <span className={`isOnline active`}></span>
      </div>
              <p>{conv.firstName}</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
            { loading? <div><span>Loading</span></div> :
          <div className="chat__items">
             
          { messages.length > 0 ? messages.map(m=> 
                      <div ref={scrollRef}>
                      <Message message={m} img={image}/>
                      </div>
                      ) : <span>no messages found</span> } 
            <div  />
          </div>
            }
        </div>
        <ChatForm/>
                    
                    </> :  <div> No conversation selected</div>}
            </div>
            
       
    )
}


export default ChatBox

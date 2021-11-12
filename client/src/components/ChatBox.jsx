import '../styles/chatBox.css'
import { useEffect, useRef } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import Message from '../components/Message'
import ChatForm from '../components/ChatFrom'
import {  getMessagesCall } from '../api/messageCall'
import { capitalize } from '../utils'



function ChatBox() {
    
    const scrollRef = useRef()
    const user = useSelector(state=>state.user.login.info)
    const conv = useSelector(state=>state.conv.active)
    const image = useSelector(state=>state.conv.active?.convImg)
    const messages = useSelector(state=>state.message.current.messages)
    const loading = useSelector(state=>state.message.loading)
  
    const dispatch = useDispatch()
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    },[messages])
    useEffect(()=>{
        const getMessages = async (payload) =>{
            await getMessagesCall(payload,dispatch)
        }
        if(conv){
               const  payload = {user,convId:conv.convId}            
            getMessages(payload)

        }
    },[conv,user])
    return (
        
            <div className="chatBox">
                
            {
                        conv ? <>
           <div className="header">
          
            <div className="currentChat">
              <div className="avatar">
                <div className="avatar-img">
                    <img src={conv.convImg} alt="#" />
                 </div>
               <span className={`isOnline active`}></span>
             </div>
              <p>{`${capitalize(conv.firstName)} ${capitalize(conv.lastName)}`}</p>
            </div>
          

          
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          
        </div>
        <div className="body">
            { loading? <div><span>Loading</span></div> :
          <div>
             
          { messages.length > 0 ? messages.map(m=> 
                      <div key={m._id} ref={scrollRef}>
                      <Message  message={m} img={image}/>
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

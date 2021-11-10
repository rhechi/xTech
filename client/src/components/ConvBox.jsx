import '../styles/convbox.css'

import { useSelector , useDispatch} from 'react-redux'
import { useEffect } from 'react'
import Conversation from "./Conversation"
import { getAllConvsCall } from '../api/convCalls'
import { setCurrentConv } from '../redux/convSlice'
import socket from '../socket'

function ConvBox() {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user.login.info)
    const convs = useSelector(state=>state.conv.current)
    useEffect(()=>{
        const getConvs = async() =>{
            await getAllConvsCall(user, dispatch)
        }
        getConvs()
    },[])   
    return (
        <div  className="main__chatlist">
           <button className="btn">
          <i className="fa fa-plus"></i>
          <span>New conversation</span>
        </button>
        <div className="chatlist__heading">
          <h2>Chats</h2>
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="chatlist__items">
            {
                convs.map(c=>(
                    <div onClick={()=>{
                      dispatch(setCurrentConv(c))
                      alert(c.convId)
                      // socket.emit("seen", {id:user.id, convId: c.convId,friendId:c.friendId})
                      }}>
                        <Conversation conv={c} />
                    </div>
                ))
            }
            </div>
        </div>
    )
}
export default ConvBox

import '../styles/convbox.css'

import { useSelector , useDispatch} from 'react-redux'
import { useEffect } from 'react'
import Conversation from "./Conversation"
import { getAllConvsCall } from '../api/convCalls'
import { logoutCall } from '../api/authCalls'
import { setCurrentConv } from '../redux/convSlice'
import{ socket } from '../socket'


function ConvBox() {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user.login.info)
    const convs = useSelector(state=>state.conv.current)
    const onClick = () =>{
      socket.disconnect()
      logoutCall(user , dispatch)
      
    }
    useEffect(()=>{
        const getConvs = async() =>{
            await getAllConvsCall(user, dispatch)
        }
        getConvs()
    },[])   
    return (
        <div  className="main__chatlist">
           <button className="btn" onClick={onClick}>
          <i className="fa fa-sign-out-alt"></i>
          
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
                convs.length>0 ? convs.map(c=>(
                    <div onClick={()=>{
                      dispatch(setCurrentConv(c))
                      console.log("c",c)
                      // socket.emit("seen", {id:user.id, convId: c.convId,friendId:c.friendId})
                      }}>
                        <Conversation conv={c} />
                    </div>
                )): <></>
            }
            </div>
        </div>
    )
}
export default ConvBox

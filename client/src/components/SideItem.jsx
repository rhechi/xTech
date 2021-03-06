import { capitalize } from '../utils'
import { addConversation } from '../api/convCalls'
import { useSelector, useDispatch } from 'react-redux'
import { socket } from '../socket'
export const SideItem = ({user}) => {
    const dispatch = useDispatch()
    const me = useSelector(state => state.user.login.info?.id)
    const convs = useSelector(state=>state.conv.current)
    const onClick = async() =>{
        await addConversation({convs,senderId: me,user},dispatch)
    }
    return (
        
        <div className="conversation">
        <div className="avatar">
        <div className="avatar-img">
        <img src={user.profilePicture} alt="" />
        
        </div>

       </div>
       <span>{`${capitalize(user.firstName)} ${capitalize(user.lastName)}`}</span>
       <button className="btn" onClick={onClick}>
        <i className="fa fa-plus"></i>
        </button>
 
           </div>
    )
}

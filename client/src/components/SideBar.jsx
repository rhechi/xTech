import '../styles/convbox.css'
import { useSelector, useDispatch } from 'react-redux'
import { SideItem } from './SideItem'
import { searchCall } from '../api/searchcall'
const SideBar = () => {
    const user = useSelector(state=>state.user.login.info) 
    const search = useSelector(state=>state.search)
    const users = search.current
    const length = users.length
    const dispatch = useDispatch()
    const loading = search.loading

    const onChange = async (e) =>{
        await searchCall({user,string: e.target.value},dispatch)
    }

    //console.log(users)
    return (
        <div>
             <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="search for people" onChange={onChange} required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        
           { loading?<span>loading</span> : length<1? <span>No users</span>: users.map(user=>(
            <SideItem key={user.id} user={user} />
           
            ) ) }
         
       
            
        </div>
    )
}

export default SideBar

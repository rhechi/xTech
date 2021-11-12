import axios from 'axios'
import { getConvsStart , getConvsSuccess , getConvsFail,addConv} from '../redux/convSlice'

const getConvs = async (payload) => {
    try {
    const res = await axios.get('/conv/',{
        headers:{
            auth: `Bearer ${payload.accessToken}`
        }
    })
    const data = res.data
    data.forEach(e=> {e.friendId = e.members.find(m=>m !== payload.id)}  )
    let convs = []
    for(let i =0;i<data.length;i++){
        const convId = data[i]._id;
        const resF = await axios.get(`/users/${data[i].friendId}`)
        const mostRecentMessage = await axios.get(`/conv/lastMessage/${convId}`,{
            headers:{
                auth: `Bearer ${payload.accessToken}`
            }
        })
        const lastMessage = mostRecentMessage.data
        const dataF = resF.data
        const conv = {
            friendId: data[i].friendId,
            convId : convId,
            firstName : dataF.firstName,
            lastName : dataF.lastName,
            convImg: dataF.profilePicture,
            lastMessage: lastMessage,
        }  
        convs.push(conv)
    }
    return convs} catch (error) {
        return {error}
    }
}
export const getAllConvsCall = async (payload,dispatch) =>{
    dispatch(getConvsStart())
    try {
        const convs = await getConvs(payload)
        if(convs.error){throw convs.error}
        dispatch(getConvsSuccess(convs))
    } catch (error) {
        console.log(error)
       dispatch(getConvsFail({error}))
    }
}

//testing prototype
export const addConversation = async (payload,dispatch) =>{
    const convs = payload.convs
    const senderId = payload.senderId
    const recieverId = payload.recieverId
    if(convs.filter(c=>c.friendId == recieverId)){
        try {
            const res = await axios.post("/conv",{senderId,recieverId})
            dispatch(addConv(res.data))
        } catch (error) {
            console.log(error)
        }
    }
}


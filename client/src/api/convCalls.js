import axios from 'axios'
import { getConvsStart , getConvsSuccess , getConvsFail , addConv ,setCurrentConv} from '../redux/convSlice'



const getConvs = async (payload) => {
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
        const lastMessage = { conversationId:"dslkdjs", senderId:"hdsalkd" , text:"check conv calls", seen:"false" }
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
    return convs
}

export const getAllConvsCall = async (payload,dispatch) =>{
    dispatch(getConvsStart())
    try {
        const convs = await getConvs(payload)
        dispatch(getConvsSuccess(convs))
    } catch (error) {
        console.log(error)
       // dispatch(getConvsFail({error}))
    }
}


import axios from 'axios'
import { loginStart, loginSuccess, loginFail } from '../redux/userSlice'
import { registerStart, registerSuccess, registerFail } from '../redux/registerSlice'
import { getConvsStart , getConvsSuccess , getConvsFail , addConv }  from '../redux/convSlice'


export const loginCall = async (payload, dispatch) =>{
    if(payload.email && payload.password)
    //maybe add more verification
    {
    dispatch(loginStart())
   
    try {
        const res = await axios.post('/auth/login',payload)
    dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFail({error}))
    }
}else {dispatch(loginFail({error: "custom input error origin: apiCalls/loginCall"}))}
}

export const registerCall = async (payload,dispatch) =>{
    dispatch(registerStart())
    try {
      //  console.log("payload: ",payload)
        //register to the database and get response
        const res = {
            success: true,
            firstName: "Madafaka",
            email: "respose@email.com",
            error: null
        }
       dispatch(registerSuccess(res))
    } catch (error) {
        dispatch(registerFail({error}))
    }
}

export const getAllConvsCall = async (payload,dispatch) =>{
    dispatch(getConvsStart())
    try {
        const data = await axios.get('/conv/',{
            headers:{
                auth: `Bearer ${payload.accessToken}`
            }
        })
        console.log("(source getAllconvsCall)data ",data)
        //make request to server
        const res =  {
            convs: [{convId: "123415678", members: ["id1","id2"]},{convId:"test",members:["123","11"]}],
             error: null
        }
        res.convs.forEach(e=>e.friendId = e.members.find(m=>m !== payload.userId))
        dispatch(getConvsSuccess(res))
    } catch (error) {
        console.log(error)
        dispatch(getConvsFail({error}))
    }
}
export const getConvCall = async(req,dispatch)=>{
    //what you get in the request
    const payload={
        user:{
            userId:"id1",
        accessToken:"",
        refreshToken:""
        },
        conv: {
       convId: "123456",
        friendId:"123456"
    }}
    //make request to server

    //what the return looks like
    const data = {
        convId: "123456",
        convName: "Raed Hechi",
        convImg:"https://api.multiavatar.com/nikar.png",
        seen: true,
        lastMessage:{text:"message body",mediaType:null}
    }
    return data
}

export const getFriendCall = async (payload)=>{
    const friendId = payload.friendId
    const user = payload.user
    try {
        // const res = await axios.get("/users/"+friendId, {
        //     headers: {auth: "Bearer "+user.accessToken}
        // })
        const  res = {};
        return res
    } catch (err) {
        console.log(err)
        return null;
    }
}

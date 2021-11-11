import axios from 'axios'
import { loginStart, loginSuccess, loginFail, logout } from '../redux/userSlice'
import { registerStart, registerSuccess, registerFail } from '../redux/registerSlice'

export const loginCall = async (payload, dispatch) =>{
    if(payload.email && payload.password)
    //maybe add more verification
    {
    dispatch(loginStart())
   
    try {
        const res = await axios.post('/auth/login',payload)
        if(res){
            dispatch(loginSuccess(res.data))
             window.localStorage.setItem("userId", res.data.id)
            window.localStorage.setItem("accessToken", res.data.accessToken)
             window.localStorage.setItem("refreshToken", res.refreshToken)
             return res.data

        }
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
//logout

export const logoutCall = async (user,dispatch) =>{
    const accessToken= user.accessToken
    const refreshToken = user.refreshToken
    dispatch(logout())
    window.localStorage.clear()
    const res = await axios.post('/auth/logout',{refreshToken},{
        headers:{
            auth : `Bearer ${accessToken}`
        }
    })
    console.log(res)
    
}
    
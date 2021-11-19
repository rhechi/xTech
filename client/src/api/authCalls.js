import axios from 'axios'
import { loginStart, loginSuccess, loginFail, logout } from '../redux/userSlice'
import { registerStart, registerSuccess, registerFail } from '../redux/registerSlice'
//Login--------
export const loginCall = async (payload, dispatch) =>{
    if(payload.email && payload.password)
    {
    dispatch(loginStart())
    try {
        const res = await axios.post('/auth/login',payload)
        if(res){
            dispatch(loginSuccess(res.data))
             window.localStorage.setItem("userId", res.data.id)
            window.localStorage.setItem("accessToken", res.data.accessToken)
             window.localStorage.setItem("refreshToken", res.data.refreshToken)
             window.localStorage.setItem("firstName", res.data.firstName)
             window.localStorage.setItem("lastName", res.data.lastName)
             window.localStorage.setItem("profilePicture", res.data.profilePicture)
             return res.data
        }
    } catch (error) {
        dispatch(loginFail({error}))
    }
}else {
    dispatch(loginFail({error: "custom input error origin: apiCalls/loginCall"}))
}
}
//refreshToken----------------------
export const refresh = async(user,dispatch) =>{
    try {
        const res = await axios.post('/auth/refresh',{refreshToken: user.refreshToken})
        if(res.data){
            dispatch(loginSuccess(res.data))
             window.localStorage.setItem("userId", res.data.id)
            window.localStorage.setItem("accessToken", res.data.accessToken)
             window.localStorage.setItem("refreshToken", res.data.refreshToken)
             
             return res.data
        }
    } catch (error) {
        return {error}
    }

}
//register--------------------------------------(UNDONE)--------------------
export const registerCall = async (payload,dispatch) =>{
    dispatch(registerStart())
    try {
       const res = await axios.post('/auth/register',payload)
      const user= res.data
      if(user.error){throw user.error}
          console.log(user)
          await loginCall({email: payload.email, password:payload.password},dispatch)
      
       dispatch(registerSuccess(true))
    } catch (error) {
        dispatch(registerFail())
    }
}
//logout

export const logoutCall = async (user,dispatch) =>{
    const accessToken= user.accessToken
    const refreshToken = user.refreshToken
    dispatch(logout())
    window.localStorage.clear()
    window.location.reload()
    const res = await axios.post('/auth/logout',{refreshToken},{
        headers:{
            auth : `Bearer ${accessToken}`
        }
    })
    console.log(res)
    
}
    
import axios from 'axios'
import { loginStart, loginSuccess, loginFail } from '../redux/userSlice'
import { registerStart, registerSuccess, registerFail } from '../redux/registerSlice'

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
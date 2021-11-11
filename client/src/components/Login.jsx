import '../styles/login.css'
import { useSelector , useDispatch } from 'react-redux'
import { loginCall } from '../api/authCalls'
import { useRef } from 'react'
import { socket } from '../socket'


function Login() {
    const error = useSelector(state=>state.user.login.info?.error)
    const user = useSelector(state=>state.user.login.info?.id)
    
   // console.log("init id",id)
    const loading = useSelector(state=>state.user.login.loading)
    //console.log("init, loading",loading)
    const email = useRef()
    const password = useRef()
    const dispatch = useDispatch()
    

    const onSubmit = async (e) =>{
        e.preventDefault()
        const creds = {email: email.current.value, password:password.current.value}
       // console.log(loginCall)
       const user =  await loginCall(creds, dispatch)
    //    socket.emit("init", user.id)
    }
   
    if(error){console.log("error: ",error)}
    return (
        <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Facebook</h3>
                <span className="loginDesc">Connect with friends and the world around you on Facebook
                </span>
            </div>
            <div className="loginRight" >
                <form className="loginBox" onSubmit={onSubmit}>
                <input type="email" 
                    className="loginInput" 
                    placeholder="Email" 
                    ref={email}
                    required
                 />
                <input type="password" 
                    className="loginInput" 
                    minLength="6"
                    placeholder="Password" 
                    ref={password}
                    required
                 />
                <button type="submit" className="loginButton" disabled={loading}>{loading?"loading": "Log In"}</button>
                <span className="loginForgot">Forgot Password?</span>
                <button className="loginRegisterButton" disabled={loading}>{loading?"loading":"Create a New Account"}</button>
                    
                </form>
            </div>
        </div>
        
    </div>
    )
}

export default Login

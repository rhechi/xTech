import '../styles/register.css'
import { useSelector , useDispatch } from 'react-redux'
import { registerCall } from '../api/authCalls'
import { useRef } from 'react'





    

function Register() {
    const loading = useSelector(state=>state.register.loading)
    const dispatch = useDispatch()
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const firstName = useRef()
    const lastName = useRef()
    const passwordAgain = useRef()

    const onSubmit = async (e) =>{
        e.preventDefault()
        if(passwordAgain.current.value !== password.current.value) { password.current.setCustomValidity("passwords don't match")}
        else{
         const payload = {
                username: username.current.value,
                firstName : firstName.current.value,
                lastName: lastName.current.value,
                email: email.current.value,
                password: password.current.value
            }
         await registerCall(payload,dispatch)
        }
    }
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Facebook</h3>
                    <span className="loginDesc">Connect with friends and the world around you on Facebook
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={onSubmit}>
                        <input type="text" className="loginInput" placeholder="Username" ref={username} required/>
                        <input type="text" className="loginInput" placeholder="firstName" ref={firstName} required/>
                        <input type="text" className="loginInput" placeholder="lastName" ref={lastName} required/>
                        <input type="email" className="loginInput" placeholder="Email" ref={email} required/>
                        <input type="password" className="loginInput" placeholder="Password" ref={password} required/>
                        <input type="password" className="loginInput" placeholder="Password Again" ref={passwordAgain} required/>
                        <button type="submit" className="loginButton">Sign Up</button>
                        <span className="loginForgot">Forgot Password?</span>
                       
                        <button className="loginRegisterButton">Log into Account</button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register

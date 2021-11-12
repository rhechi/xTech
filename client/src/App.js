import './styles/app.css'
import Login from './components/Login'
import Register from './components/Register'
import Chat from './pages/Chat'
import { useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";




function App() {
  const user = useSelector(state=>state.user.login.info?.id)
  const reg = useSelector(state=>state.register.success)
  // axios.interceptors.request.use(async (config) =>{
  //   if(user){
  //     let time = new Date()
  //     const decodedToken = jwt_decode(user.accessToken)
  //     if(decodedToken.exp *1000 < time.getTime()){
  //       await refresh(user,dispatch)
  //     }

  //   }

  // })
     
    
  
  return (
     
    <Router>
    <Switch>
    <Route exact path="/">{!user ? <Redirect to="/login" /> : <Chat />}</Route>
      <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
      <Route path="/register">
        {(user || reg) ? <Redirect to="/" /> : <Register />}
      </Route>
    </Switch>
    
  </Router>
  );
}

export default App;

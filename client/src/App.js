import  { useEffect }from 'react';
import './styles/app.css'
import Login from './components/Login'
import Register from './components/Register'
import Chat from './pages/Chat'
//import { io } from "socket.io-client"
import { useSelector , useDispatch} from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";




function App() {
  const user = useSelector(state=>state.user.login.info?.id)
  const currentConv = useSelector(state=>state.conv.active)
  const dispatch = useDispatch()
      
   
     
    
  
  return (
     
    <Router>
    <Switch>
    <Route exact path="/">{!user ? <Redirect to="/login" /> : <Chat />}</Route>
      <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
      <Route path="/register">
        {user ? <Redirect to="/" /> : <Register />}
      </Route>
    </Switch>
    
  </Router>
  );
}

export default App;

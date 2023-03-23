import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {authState, setAuthState} = useContext(AuthContext);
  if(authState == true){
    navigate("/profile");
  }
  const login = () => {
    
    const data = {username:username,password:password};
    axios.post("http://localhost:3003/users/login", data).then((response) => {
      
      if(response.data.error){
        alert(response.data.error);
      }
      else {
        localStorage.setItem("accessToken", response.data);
        setAuthState(true);
        navigate("/profile");
      }
    })
  }
  return (
    <div className='FormPanel'>
      <label className='formLabel'>Username:</label>
      <input 
      className='inputField' 
      placeholder='Enter your username...'
      type="text"
      onChange={(event) => {
        setUsername(event.target.value);
      }}>
      </input>
      <label className='formLabel'>Password:</label>
      <input 
      className='inputField' 
      placeholder='Enter your password...'
      type="password"
      onChange={(event) => {
        setPassword(event.target.value);
      }}>
      </input>
      <button
      id="btn" 
      onClick={login}>
      Login
      </button>
      Don't have an account?&nbsp; 
      <Link to ="/register">Register here</Link>
    </div>
  )
}

export default Login
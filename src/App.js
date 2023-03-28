import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react"
import Home from "./pages/Home";
import AddExercise from "./pages/AddExercise";
import Exercise from "./pages/Exercise";
import Workouts from "./pages/Workouts"
import Exercises from "./pages/Exercises";
import Workout from "./pages/Workout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import {AuthContext} from "./helpers/AuthContext";
import axios from "axios";
import "./App.css";


function App() {
  const [authState, setAuthState] = useState(false);
  //Check if the user is logged in.
  useEffect(() => {
    axios.get('http://localhost:3003/users/auth', {
      headers :{
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) =>{
      if(response.data.error) {
        setAuthState(false);;

      } else {
        setAuthState(true);
      }
    })
  },[])
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState(false);
    alert("You have logged out successfully");
  }
  return (
  <div className="App">
    <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        {authState &&(
          <nav className="navbar">
            <ul className="navbar-nav">
              <li className="logo">
                <Link to="/" className="nav-link">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 448 512">
                  <path
                    d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                    fill="fuchsia"
                    />
                </svg>
                  <span className="link-text logo-text">Workout Tracker</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 448 512">
                    <path 
                      d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                      fill="aqua"
                    />
                  </svg>
                  <span className="link-text">Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/leaderboard" className="nav-link">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 576 512">
                  <path 
                  d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"
                  fill="yellow"
                  />
                </svg>
                  <span className="link-text">Leaderboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/workouts" className="nav-link">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 320 512">
                  <path 
                    d="M160 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM126.5 199.3c-1 .4-1.9 .8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.2-40.5l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9L281 232.7l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L68.7 398z"
                    fill="lime"
                  />
                </svg>
                  <span className="link-text">Workouts</span>
                </Link>
              </li>
              
              <li className="nav-item">
                <Link to="/exercises" className="nav-link">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 640 512">
                  <path 
                    d="M112 96c0-17.7 14.3-32 32-32h16c17.7 0 32 14.3 32 32V224v64V416c0 17.7-14.3 32-32 32H144c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32h48V96zm416 0v32h48c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H528v32c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 96c0-17.7 14.3-32 32-32h16c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z"
                    fill="lightgrey"
                  />
                </svg>
                  <span className="link-text">Exercises</span>
                </Link>
              </li>
              <li className="nav-item">
                <a onClick={logout} className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path 
                  d="M96 64c0-35.3 28.7-64 64-64H416c35.3 0 64 28.7 64 64V448h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H432 144 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96V64zM384 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                  fill="chocolate"
                  />
                </svg>
                  <span className="link-text">Logout</span>
                </a>
              </li>
            </ul>
          </nav>
        )}
        <Routes>
          {authState &&(
          <>
            <Route path="/exercises" element={<Exercises />}></Route>
            <Route path="/addworkout"></Route>
            <Route path="/addexercise" element={<AddExercise />}></Route>
            <Route path="/exercises/byId/:id" element={<Exercise />}></Route>
            <Route path="/workouts" element={<Workouts />}></Route>
            <Route path="/workouts/byId/:id" element={<Workout/>}></Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/profile" element ={<Profile/>}></Route>
            <Route path="leaderboard" element = {<Leaderboard/>}></Route>
          </>
          )}
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
    { <footer className="footer">
      <div className="images">
      <img src="/logo192.png" className="footerImage"></img>
      <img src="/nodejs.png" className="footerImage"></img>
      </div>
      <div className="copyright">
      Copyright@ 2023 Arnas Erslovas
      </div>      
      
      
      </footer> }
  </div>
  
  )
}


export default App;

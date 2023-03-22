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
import {AuthContext} from "./helpers/AuthContext";
import axios from "axios";
import "./App.css";

function App() {
  const [authState, setAuthState] = useState(false);
  //Check if the user is logged in.
  useEffect(() => {
    axios.get('http://localhost:3001/users/auth', {
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

  return (
  <div className="App">
    <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        {authState &&(
          <nav className="navbar">
            <ul className="navbar-nav">
              <li className="logo">
                <a href="/" className="nav-link">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 448 512">
                  <path
                    fill="white"
                    d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                </svg>
                  <span className="link-text logo-text">Workout Tracker</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/profile" className="nav-link">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 448 512">
                    <path 
                      d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                      fill="white"
                    />
                  </svg>
                  <span className="link-text">Profile</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/workouts" className="nav-link">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 320 512">
                  <path 
                    d="M160 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM126.5 199.3c-1 .4-1.9 .8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.2-40.5l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9L281 232.7l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L68.7 398z"
                    fill="white"
                  />
                </svg>
                  <span className="link-text">Workouts</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/exercises" className="nav-link">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 640 512">
                  <path 
                    d="M112 96c0-17.7 14.3-32 32-32h16c17.7 0 32 14.3 32 32V224v64V416c0 17.7-14.3 32-32 32H144c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32h48V96zm416 0v32h48c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H528v32c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 96c0-17.7 14.3-32 32-32h16c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z"
                    fill="white"
                  />
                </svg>
                  <span className="link-text">Exercises</span>
                </a>
              </li>
            </ul>


            {/* <Link to="/addexercise" className="navigation-item"> Add an exercise</Link>
            <Link to="/exercises" className="navigation-item"> Exercises</Link>
            <Link to="/profile" className="navigation-item"> Profile</Link>
            <Link to="/workouts" className="navigation-item"> Workouts</Link> */}
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
          </>
          )}
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
    {/* <footer className="footer">
      <div className="images">
      <img src="/logo192.png" className="footerImage"></img>
      <img src="/nodejs.png" className="footerImage"></img>
      </div>

      Copyright@ 2023 Arnas Erslovas
      
      </footer> */}
  </div>
  
  )
}


export default App;

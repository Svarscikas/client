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
import {AuthContext} from "./helpers/AuthContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
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
          <div className="navigation">
            <Link to="/addexercise" className="navigation-item"> Add an exercise</Link>
            <Link to="/exercises" className="navigation-item"> Exercises</Link>
            <Link to="/profile" className="navigation-item"> Profile</Link>
            <Link to="/workouts" className="navigation-item"> Workouts</Link>
          </div>
        )}
        <Routes>
          <Route path="/exercises" element={<Exercises />}></Route>
          <Route path="/addworkout"></Route>
          <Route path="/addexercise" element={<AddExercise />}></Route>
          <Route path="/exercises/byId/:id" element={<Exercise />}></Route>
          <Route path="/workouts" element={<Workouts />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/workouts/byId/:id" element={<Workout/>}></Route>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
    <footer className="footer">
      <div className="images">
      <img src="/logo192.png" className="footerImage"></img>
      <img src="/nodejs.png" className="footerImage"></img>
      </div>

      Copyright@ 2023 Arnas Erslovas
      
      </footer>
  </div>
  
  )
}

export default App;

import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import React, {useEffect, useState} from "react"
import Home from "./pages/Home";
import AddExercise from "./pages/AddExercise";
import Exercise from "./pages/Exercise";
import Workouts from "./pages/Workouts"
import Exercises from "./pages/Exercises";
import Workout from "./pages/Workout";
import Register from "./pages/Register";
import Login from "./pages/Login";


import "./App.css";

function App() {

  return (
  <div className="App">
    <Router>
      <div className="navigation">
        <Link to="/addexercise" className="navigation-item"> Add an exercise</Link>
        <Link to="/exercises" className="navigation-item"> Exercises</Link>
        <Link to="/profile" className="navigation-item"> Profile</Link>
        <Link to="/workouts" className="navigation-item"> Workouts</Link>
      </div>
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

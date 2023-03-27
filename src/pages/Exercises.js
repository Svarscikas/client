import React from 'react'
import axios from "axios";
import  { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

function Exercises() {
    let [exerciseList, setExerciseList] = useState([]);
    const [admin, setAdmin] = useState(false);
    let navigate = useNavigate();
    useEffect(()=> {
        axios.get("http://localhost:3003/exercises/", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          }
        }).then( (response) =>{
          setExerciseList(response.data.exerciseList);
          setAdmin(response.data.user);
        });
      },[])
  return (
    <main>
      <div className="Header">Exercises</div>
      {admin && <button className='addExerciseButton' onClick={() => navigate('/addexercise')}>Add new exercise
      </button>}
      <div className='Exercise-Wrapper'>
      {exerciseList.map((value, key) =>{
        return(
          
            <div className='ExerciseCard' onClick={() => navigate(`/exercises/byId/${value.id}`)}>
              <div className='ExerciseTitle'>{value.title}</div>
              <div className='text'>{value.personalBest > 0 && <p class="text">Personal best: {value.personalBest} Kg</p>}</div>
              
            </div>
            
          
        );
      })}
      </div>
    </main>
    
  )
}
export default Exercises;
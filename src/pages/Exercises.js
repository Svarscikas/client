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
      {exerciseList.map((value, key) =>{
        return(
          <div>
            <div className='Card' onClick={() => navigate(`/exercises/byId/${value.id}`)}>
              <div className='WorkoutTitle'>{value.title}</div>
              <div className='text'>{value.personalBest > 0 && <p class="text">Personal best: {value.personalBest} Kg</p>}</div>
              
            </div>
            
          </div>
        );
      })}
    </main>
    
  )
}
export default Exercises;
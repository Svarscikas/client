import React from 'react'
import axios from "axios";
import  { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

function Exercises() {
    let [exerciseList, setExerciseList] = useState([]);
    let navigate = useNavigate();
    useEffect(()=> {
        axios.get("http://localhost:3001/exercises/", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          }
        }).then( (response) =>{
          setExerciseList(response.data);
        });
      },[])
  return (
    <main>
       <div className="Header">Exercises</div>    
      <button className='addExerciseButton' onClick={() => navigate('/addexercise')}>Add new exercise
      </button>
      {exerciseList.map((value, key) =>{
        return(
          <div>
            <div className='Exercise1' onClick={() => navigate(`/exercises/byId/${value.id}`)}>
              {value.title}
              {value.personalBest > 0 && <p class="text">Personal best: {value.personalBest} Kg</p>}
            </div>
            
          </div>
        );
      })}
    </main>
    
  )
}
export default Exercises;
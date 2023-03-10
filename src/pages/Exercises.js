import React from 'react'
import axios from "axios";
import  { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Collapsible from 'react-collapsible';

function Exercises() {
    let [exerciseList, setExerciseList] = useState([]);
    let navigate = useNavigate();
    useEffect(()=> {
        axios.get("http://localhost:3001/exercises/").then( (response) =>{
          setExerciseList(response.data);
        });
      },[])
  return (
    <div>
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
    </div>
    
  )
}
export default Exercises;
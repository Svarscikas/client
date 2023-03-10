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
function showExerciseInfo() {
  return (
    <Collapsible trigger="Start here">
      <p>
        This is the collapsible content. It can be any element or React
        component you like.
      </p>
      <p>
        It can even be another Collapsible component. Check out the next
        section!
      </p>
    </Collapsible>
  )
}
//onClick={() => navigate(`/exercises/byId/${value.id}`)}
  return (
    <div>
      {exerciseList.map((value, key) =>{
        return(
          <div>
            <div className='Exercise1' onClick={() => navigate(`/exercises/byId/${value.id}`)}>
              {value.title}
              <p>Personal best: {value.personalBest}</p>
            </div>
            
          </div>
        );
      })}
    </div>
    
  )
}
export default Exercises;
import React from 'react'
import axios from "axios";
import  { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'



function Exercises() {
    let [exerciseList, setExerciseList] = useState([]);
    const [admin, setAdmin] = useState(false);
    const [inputText, setInputText] = useState("");
    let navigate = useNavigate();

    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };
  

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
      <div className='ButtonRow'>
        {admin && <button className='addExerciseButton' onClick={() => navigate('/addexercise')}>Add new exercise
        </button>}
        {!admin && <button className='addExerciseButton'>Suggest new exercise</button>}
        <input className='searchBar' type="text" placeholder='Search for an exercise...' onChange={inputHandler}></input>
      </div>
      <Search input={inputText}/>
    </main>
    
  )
  function Search(props) {
    const filteredData = exerciseList.filter((el) => {
      if(props.input === '') {
        return el;
      }
      else {
        return el.title.toLowerCase().includes(props.input)
      }
    })
    return (
      <div className='Exercise-Wrapper'>
        {filteredData.map((value,key) =>{
          return(
            
              <div className='ExerciseCard' onClick={() => navigate(`/exercises/byId/${value.id}`)}>
                <div className='ExerciseTitle'>{value.title}
                {admin && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='white' d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>}       
                </div>
                <div className='text'>{value.personalBest > 0 && <p className="text">Personal best: {value.personalBest} Kg</p>}
                {value.personalBest == "No data provided" && <p className='text'>Personal best: No data</p>}
                </div>                
              </div>        
          );
        })}
        </div>
    )
  }

}
export default Exercises;
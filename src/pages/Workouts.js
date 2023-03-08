import axios from 'axios';
//import fetch from 'node-fetch';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import React from 'react';

function Workouts(){
    const [workoutList, setWorkoutList] = useState([]);
    let navigate = useNavigate();
    useEffect(()=> {
        
        axios.get("http://localhost:3001/workouts/").then( (response) =>{
          setWorkoutList(response.data);
        });
      },[])

    const onSubmit = () =>{
        axios.post("http://localhost:3001/workouts/",{
            title : "Workout",
            description : "Dummy workout",
            duration: 2
        },
        {
          headers :{
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
        ).then((response) => {
          if(response.data.error) {
            alert(response.data.error)
          }
          else{
            setWorkoutList(response.data);
          } 
        });
    }
    function deleteWorkout(id) {
      axios.delete('http://localhost:3001/workouts/' + id).then((response) =>{
        console.log(response.data);
        setWorkoutList(response.data)
      });
    }
  return (
    <div>
        <div className='workoutDiv'>
          <div className='addExerciseButton' onClick={onSubmit}>Add new workout</div>
        </div>
        {workoutList.map((value, key) =>{
        return(
          <div className="Card">
            <div className="Exercise"onClick={() => navigate(`/workouts/byId/${value.id}`)}>{value.createdAt}</div>
            <div>
              Exercises
            </div>
            <button onClick={() => deleteWorkout(value.id)}>Delete</button>
          </div>
        );
      })}</div>
  )
}
export default Workouts
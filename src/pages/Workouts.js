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
        
        axios.get("http://localhost:3003/workouts/",{
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          }
        }).then( (response) =>{
          if(response.data.error) {
            navigate("/login");
            alert(response.data.error)
          }
          else{
            setWorkoutList(response.data);
            console.log(response.data);
          } 
        }
        );
      },[])

    const onSubmit = () =>{
        axios.post("http://localhost:3003/workouts/",{
            title : "Workout",
            description : "Dummy workout",
            status: false,
        },
        {
          headers :{
            accessToken: localStorage.getItem("accessToken"),
          },
        }
        ).then((response) => {
          if(response.data.error) {
            alert(response.data.error)
          }
          else{
            //setWorkoutList(response.data);
            const id = response.data[0].id
            navigate("/workouts/byId/" + id);
          } 
        });
    }
    function deleteWorkout(id) {
      axios.delete('http://localhost:3003/workouts/' + id,{
        headers :{accessToken: localStorage.getItem("accessToken"),},
      }).then((response) =>{
        alert("Workout deleted");
        navigate(0);
      });
    }
  return (
    
    <main>
       <div className="Header">Workouts</div>    
        <div className='workoutDiv'>
          <div className='addExerciseButton' onClick={onSubmit}>Add new workout</div>
        </div>
        {workoutList.map((value, key) =>{
        return(
          <div className="Card">
            <div className="Exercise"onClick={() => navigate(`/workouts/byId/${value.id}`)}>{value.createdAt.slice(0.,10)}{' '}
            {value.status == 0 && <p className='inProgress'>In progress</p>}{value.status == 1 && <p className='completed'>Completed</p>}
            </div>

            <div className='ExerciseContent'>Exercise count: {value.exerciseCount}</div>
            <div className='ButtonRow'>
            <button className='addExerciseButton' onClick={() => deleteWorkout(value.id)}>Delete</button>
            </div>
            
          </div>
        );
      })}</main>
  )
}
export default Workouts
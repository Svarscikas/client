import axios from 'axios';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
//import { ValidationError } from 'sequelize';
import { useNavigate } from 'react-router-dom';

function Workout() {
    let navigate = useNavigate();
    //console.log(List);
    //Lets to use object data in the page
    let { id } = useParams();
    const [workoutObject, setWorkoutObject] = useState({});
    const [exerciseObject, setExerciseObject] = useState([]);
    const [showAddExcercise, setShowAddExcercise] = useState(false);
    const [workoutExercise, setWorkoutExercise] = useState([]);
    const [buttonText, setButtonText] = useState("Add new excercise");
    const [completeButton, setCompleteButton] = useState();

    const handleExcercisesButton = () => {
      setShowAddExcercise(!showAddExcercise);
      if (showAddExcercise) {
        setButtonText("Add new excercise") 
      } else {
        setButtonText("Cancel")
      }
    }
    const completeWorkout = () => {
      if(!workoutExercise.length){
        alert("You must have atleast one exercise done to complete it.");
        return;
      }
      axios.put('http://localhost:3001/workouts/byId/' + id).then ((response) => {
         alert(response.data);
         navigate('/workouts');
      })
    }

    useEffect(() => {
      axios.get('http://localhost:3001/workouts/byId/' + id).then( (response) =>{
        setWorkoutObject(response.data.workout);
        setWorkoutExercise(response.data.exercises);
        //console.log(response.data);
      });
      axios.get('http://localhost:3001/exercises/').then( (response) =>{
        setExerciseObject(response.data);
      });
     },[])
  
    

    return( <div className="Card">             
                <h2>{workoutObject.title} {workoutObject.createdAt?.slice(0,10)}</h2>
                <div>{ShowWorkoutExercises(workoutExercise, setWorkoutExercise,workoutObject)}</div>
                {workoutObject.status == false &&
                  <button id="Btn" className='addExerciseButton' onClick={handleExcercisesButton}>{buttonText}</button>
                }
                {workoutObject.status == false && 
                  <button id ="Btn" className='addExerciseButton' onClick={completeWorkout}>Complete workout</button>
                }
                <div>{AddExerciseForm(exerciseObject, showAddExcercise, id, setWorkoutExercise, workoutExercise)}</div>
            </div>);
  
  

}


function deleteRow(id, workoutId, setWorkoutExercise){
  axios.delete("http://localhost:3001/workouts/byId/"+ id + "/" + workoutId).then((response) =>{
    setWorkoutExercise(response.data);
    //setWorkoutExercise(response.data)
  })
}
const ShowWorkoutExercises = (workoutExercise,setWorkoutExercise,workoutObject) => {
  if(!workoutExercise.length)
  return(
    <div> You have no exercises in this workout. </div>
  )
  else {
    //console.log(workoutExercise);
    //console.log(workoutObject);
    return (
      <div>
        <table className='exerciseTable'>
                <tr>
                  <th>Exercise</th>
                  <th>Weight</th>
                  <th>Repetitions</th>
                </tr>
                {workoutExercise.map((value, key) =>{
          return(
            <tr>
              <td>{value.title}</td>
              <td>{value.weight} kg</td>
              <td>{value.repetitions}</td>
              <button className="deleteBtn">
                <img src="/delete.png"
                 onClick={() => {
                  {workoutObject.status == true && alert("Cannot delete an exercise when workout is completed")}
                  {workoutObject.status== false && deleteRow(value.id, value.workoutId, setWorkoutExercise)}
                 }}>
                </img>
              </button>
            </tr>
            
          );
        })}
        </table>
      </div>
      
    )
  }
}

const AddExerciseForm = (exerciseObject, showAddExcercise, workoutiD, setWorkoutExercise, workoutExercise) => {
  const [selectedValue, setSelected] = useState(1);
  

  const handleChange = (event) => {
      setSelected(event.target.value);
      //console.log("event.target.value");
  };
  if (showAddExcercise === false ) {
    //setSelected(1);
    return (
      <div>{workoutiD}</div>
    )
  } else {
  return (
    <Formik initialValues={{ exercise: "1", weight : 0, repetitions : 0, workoutId : workoutiD }}
    onSubmit={(data) => {
      data.exercise = selectedValue;
       axios.post("http://localhost:3001/workouts/byId/:id", data).then((response)=>{
          setWorkoutExercise(response.data);
      })  
    }}
    >
        {({ isSubmitting }) => (
            <Form>
              <div className='exerciseFormWrap'>
                <div className='exerciseFromLabels'>
                <select name="exercise" value={selectedValue} className='inputField' onChange={handleChange}>
                    {exerciseObject.map((exercise, key) => {
                    return(
                      <option name ="exercise" value={exercise.id}>{exercise.title}</option>
                      )
                      })}
                  </select>
                </div>
                  
                  <div className='exerciseFormLabels'>
                  <Field name="weight" placeholder="Weight(kgs)..." className="inputField"/>
                  </div>
                  <div className='exerciseFormLabels'>
                  <Field name="repetitions" placeholder="Repetitions..." className="inputField"/>
                  
                  </div>
                  <button type='submit' className="addExerciseButton2">+</button>
              </div>
            </Form>
        )}
    </Formik>
)}}

export default Workout;
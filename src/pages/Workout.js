import axios from 'axios';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import { Field, Form, Formik, FormikProps, ErrorMessage } from 'formik';
//import { ValidationError } from 'sequelize';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
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
      axios.put('https://workout-tracker-server-app.onrender.com/workouts/byId/' + id).then ((response) => {
         alert(response.data);
         navigate('/workouts');
      })
    }

    useEffect(() => {
      axios.get('https://workout-tracker-server-app.onrender.com/workouts/byId/' + id).then( (response) =>{
        setWorkoutObject(response.data.workout);
        setWorkoutExercise(response.data.exercises);
        //console.log(response.data);
      });
      axios.get('https://workout-tracker-server-app.onrender.com/exercises/', {
        headers : {
          accessToken: localStorage.getItem("accessToken"),
        }
      }).then( (response) =>{
        setExerciseObject(response.data.exerciseList);
      });
     },[])
  
    

    return(
       <main>
        <div className="Card">             
          <h2 className='WorkoutTitle'>{workoutObject.title} {workoutObject.createdAt?.slice(0,10)}</h2>
          <div>{ShowWorkoutExercises(workoutExercise, setWorkoutExercise,workoutObject)}</div>
          <div className='ButtonRow'>
          {workoutObject.status == false &&
              <button id="Btn" className='addExerciseButton' onClick={handleExcercisesButton}>{buttonText}</button>
            }
            {workoutObject.status == false && 
              <button id ="Btn" className='addExerciseButton' onClick={completeWorkout}>Complete workout</button>
            }

          </div>
            
          <div>{AddExerciseForm(exerciseObject, showAddExcercise, id, setWorkoutExercise, workoutExercise)}</div>
        </div>
       </main>
       );
  
  

}


function deleteRow(id, workoutId, setWorkoutExercise){
  axios.delete("https://workout-tracker-server-app.onrender.com/workouts/byId/"+ id + "/" + workoutId,
  {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    } 
   }).then((response) =>{
    if(response.data.errors) {
      alert(response.data.errors);
    }
    else{
      setWorkoutExercise(response.data);
    }
  })
}
const ShowWorkoutExercises = (workoutExercise,setWorkoutExercise,workoutObject) => {
  if(!workoutExercise.length)
  return(
    <div className='CenteredText'> You have no exercises in this workout. </div>
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
  } else {
  const validationSchema = Yup.object().shape({
      weight: Yup.
      string().
      required("You must enter the weight").
      max(5,"The weight is too big to lift").
      test('Is positive','The weight must be a number greater or equal to 0',(value)=> value >= 0),

      repetitions: Yup.
      string().
      required("You must do atleast one rep to add an exercise").
      max(5, "Too many repetitions. I doubt you've done so much").
      test('Is positive','The repetitions must be a number greater than 0',(value)=> value > 0),
  })
  let initialValues = {
    exercise : 1,
    weight : "",
    repetitions : "",
    workoutId : workoutiD,
  }
  return (
    
    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={(data) => {

      data.exercise = selectedValue;
       axios.post("https://workout-tracker-server-app.onrender.com/workouts/byId/:id", data,{
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        } 
       }).then((response)=>{
          if(response.data.error){
            alert(response.data.error);
          }
          else{
            setWorkoutExercise(response.data);
          } 
      },)  
    }}
    >
        {({ isSubmitting }) => (
            <Form>
              <div className='exerciseFormWrap'>
                <div className='exerciseFormLabels'>
                <select name="exercise" value={selectedValue} className='inputField' onChange={handleChange}>
                    {exerciseObject.map((exercise, key) => {
                    return(
                      <option name ="exercise" value={exercise.id}>{exercise.title}</option>
                      )
                      })}
                  </select>
                </div>
                <div className='exerciseFormLabels'>
                <Field name="weight" type="number" placeholder="Weight(kgs)..." className="inputField"/>
                </div>
                <div className='exerciseFormLabels'>
                <Field type ="number" name="repetitions" placeholder="Repetitions..." className="inputField"/>
                </div>
                <div className='exerciseFormLabels'>
                <button type='submit' className="addExerciseButton2">+</button>
                </div>
                     
              </div>
              <div className='errorBox'>
                <ErrorMessage name = "weight" component = "span" className="errorMsg"></ErrorMessage>
                <br></br>
                <ErrorMessage name = "repetitions" component = "span" className="errorMsg"></ErrorMessage>
              </div>
              
            </Form>
        )}
    </Formik>
)}}

export default Workout;
import React from 'react'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, yupToFormErrors} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

function AddExercise() {

    //const alert = useAlert();
    let navigate = useNavigate();
    const initialValues = {
        title: "",
        description: "",
        //weight: 0,
        //maxWeight: 0
    };
    const validationSchema = Yup.object().shape({
        title: Yup.
        string().
        required("Please enter the name of the exercise"),
        description: Yup.
        string().
        required("Please enter the description for the exercise"),
    });
    const onSubmit = (data) => {

        axios.post("http://localhost:3001/exercises/", data).then( (response) =>{
            if(response.data != "Duplicate") {
                alert("Exercise added.")            
                navigate('/exercises');
            }
            else{
               alert("The exercise already exists.")
            }
        });
    }
  return (
    <div className='FormPanel'>
        <Formik initialValues={initialValues} onSubmit = {onSubmit} validationSchema = {validationSchema}>
            <Form>
                <label class="formLabel">Title:</label>
                <ErrorMessage name = "title" component = "span" className="errorMsg"></ErrorMessage>
                <Field 
                    id="inputAddExercise"
                    class="inputField"
                    name="title" 
                    placeholder="Ex. Bench press..."
                />
                <label class="formLabel">Description:</label>
                <ErrorMessage name = "description" component = "span" className="errorMsg"></ErrorMessage>
                <Field 
                    id="inputExerciseDescription"
                    class="inputField"
                    name="description" 
                    placeholder="Which muscles does it target?"
                />
                <button id="btn" type='submit'>Add Exercise</button>
                
            </Form>
            
        </Formik>
        
    </div>
  );
}

export default AddExercise
import axios from 'axios'
import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, yupToFormErrors} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext'
import Alert from '@mui/material/Alert';

function Register() {
  const navigate = useNavigate();
  const {authState, setAuthState} = useContext(AuthContext);
  if(authState == true) {
    navigate('/profile');
  }
  const initialValues = {
    username : "",
    password : "",
  }
  const validationSchema = Yup.object().shape({
    username : Yup.string().required("You must enter a username to create it.").min(4).max(20),
    password : Yup.string().required("You must enter a password").min(6),
  })
  const onSubmit = (data) => {
    axios.post('https://workout-tracker-server-app.onrender.com/users/register', data).then((response)=>{
      console.log(response.data);
      if(response.data == "0"){
        
        alert("The username you tried to register with already exists.");
      }
      else{
        alert("You have registered succesfully.");
        
        navigate('/login');
      }
    });
  }
  return (
    <Formik initialValues= {initialValues} validationSchema = {validationSchema} onSubmit = {onSubmit}>
      <Form className='FormPanel'>
        <label className='formLabel'>Username:</label>
        <ErrorMessage name = "username" component = "span" className="errorMsg"></ErrorMessage>
        <Field 
        className="inputField" 
        name ="username" 
        placeholder="Please enter your desired username...">
        </Field>
        <label className='formLabel'>Password:</label>
        <ErrorMessage name = "password" component = "span" className="errorMsg"></ErrorMessage>
        <Field 
        className="inputField" 
        name="password" 
        type="password" 
        placeholder = "Please enter your password...">
        </Field>
        <button id ="btn"type='submit'>Register</button>
        Already have an account?&nbsp; 
      <Link to ="/login">Login here</Link>
      
      </Form>
    </Formik>
  )
}
export default Register
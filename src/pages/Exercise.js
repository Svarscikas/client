import axios from 'axios';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Exercise() {
    //Lets to use object data in the page
    let { id } = useParams();
    const [exerciseObject, setExerciseObject] = useState({});
    useEffect(() => {
      axios.get('http://localhost:3001/exercises/byId/' + id).then( (response) =>{
        console.log(response);
        setExerciseObject(response.data);
      });
    },[])
    return( <div className="Card">             
              <div className='Exercise'>{exerciseObject.title}</div>
              <div className='Description'>{exerciseObject.description} </div>
              <div className="Weight">Weight: {exerciseObject.weight}</div>
              <div className="MaxWeight">Personal best: {exerciseObject.maxWeight}</div>
              <button className='buttonStyle'>Add to your workout</button>
            </div>);
}

export default Exercise;
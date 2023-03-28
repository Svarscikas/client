import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Profile() {

    const [profile, setProfile] = useState([]);
    const [inputs, setInputs] = useState({});
    const [completedWorkouts, setCompletedWorkouts] = useState(0);
    const [totalExercises, setTotalExercises] = useState(0);
    const [editInfo, setEditInfo] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:3003/users/profile",{ 
            headers : {
            accessToken : localStorage.getItem("accessToken"),
            }
            }).then( (response) =>{
            if(response.data.error){
                alert(response.data.error);
            }
            else {
                setProfile(response.data.user);
                console.log(response.data.user)
                setCompletedWorkouts(response.data.completedWorkouts);
                setTotalExercises(response.data.totalExercises);
            }
        });
    },[]);
    
    const handleProfileInfoEdit = (event) => {
        event.preventDefault();
        if(!error){
            axios.put("https://workout-tracker-server-app.onrender.com/users/updateProfile", inputs, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }).then((response) => {
                if(response.data.errors){
                    console.log(response.data.errors)
                    setEditInfo(false);
                }
                else{
                    setProfile(response.data)
                    setEditInfo(false);
                }
                
            })
        }       
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if(value < 0) {
            setError(true);
        }
        if(value >= 0) {
            setError(false);
        }
        setInputs(values => ({...values, [name]: value}))
    }
    return (
        <main>
            <div className="Header">Profile</div>
            <div className="ProfileCard">
                <div className="CardTitle">Personal Info</div>
                <div>
                {profile.map((value,key) =>{
                    return(
                        <div>
                            <div className="Statistics">
                            Username: {value.username} <br></br>
                            </div>
                            <div className="Statistics">
                                <div>Total workouts done: {completedWorkouts}</div>
                            </div>
                            <div className="Statistics">
                                <div>Total Exercises: {totalExercises}</div>
                            
                            </div>
                            <form onSubmit={handleProfileInfoEdit}>
                                <div className="Statistics">     
                                    <div Statistics-item> 
                                        Weight:
                                        <div className="Statistics-editable"> {!editInfo && value.weight} 
                                            {editInfo && <input
                                            min = "0" 
                                            type="number" 
                                            name="weight"
                                            value={inputs.weight || ""} 
                                            placeholder="Enter your weight"
                                            onChange={handleChange}
                                            ></input>} kg
                                        </div>
                                        Height:
                                        <div className="Statistics-editable"> {!editInfo && value.height}
                                            {editInfo && <input
                                            min = "0"
                                            type="number"
                                            name="height" 
                                            value={inputs.height || ""} 
                                            placeholder="Enter your height"
                                            onChange={handleChange}
                                            ></input>} cm
                                        </div>
                                        Age:
                                        <div className="Statistics-editable">{!editInfo && value.age}
                                            {editInfo && <input 
                                            placeholder="Enter your age"
                                            min = "0"
                                            name="age" 
                                            type="number" 
                                            onChange={handleChange}
                                            value={inputs.age || ""} ></input>} years
                                        </div>
                                        {error &&<span className="errorMsg">Please provide a positive values</span>}
                                    </div>
                                    <div className="Statistics-item">
                                        {editInfo && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={handleProfileInfoEdit}><path fill="green" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>}
                                        {editInfo && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" onClick={() => setEditInfo(false)}><path fill="red"d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>}
                                        {!editInfo && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => setEditInfo(true)}><path fill="gold" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>}
                                    </div>
                                          
                                </div>
                            </form>
                        </div>            
                    )
                })}
            </div>
            </div>       
        </main>
           
    )
    
}

export default Profile;
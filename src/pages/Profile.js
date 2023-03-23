import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Profile() {

    let [profile, setProfile] = useState([]);
    let [completedWorkouts, setCompletedWorkouts] = useState(0);
    let [totalExercises, setTotalExercises] = useState(0);

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
                setCompletedWorkouts(response.data.completedWorkouts);
                setTotalExercises(response.data.totalExercises);
            }
        });
    },[]);
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
                            Weight: {value.weight} kg
                            </div>
                            <div className="Statistics">
                            Height: {value.height} cm
                            </div>
                            <div className="Statistics">
                            Age: {value.age} years old
                            </div>
                            <div className="Statistics">
                            Total workouts done: {completedWorkouts}
                            </div>
                            <div className="Statistics">
                            Total Exercises: {totalExercises}
                            </div>
                        </div>            
                    )
                })}
            </div>
            </div>       
        </main>
           
    )
    
}

export default Profile;
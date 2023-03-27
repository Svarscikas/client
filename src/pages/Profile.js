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
                                <div>Total workouts done: {completedWorkouts}</div>
                            </div>
                            <div className="Statistics">
                                <div>Total Exercises: {totalExercises}</div>
                            
                            </div>
                            <div className="Statistics">
                                <div className="Statistics-item">Weight: {value.weight} kg</div>
                                <svg className ="Statistics-item"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="gold" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                                
                            </div>
                            <div className="Statistics">
                                
                                <div>Height: {value.height} cm</div>
                                <svg className ="Statistics-item"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="gold" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                            </div>
                            <div className="Statistics">
                                <div>Age: {value.age} years old</div>
                                <svg className ="Statistics-item"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="gold" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
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
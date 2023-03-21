import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext"
import axios from "axios";
function Profile() {

    let [profile, setProfile] = useState([]);
    let [completedWorkouts, setCompletedWorkouts] = useState(0);
    const {setAuthState} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:3001/users/profile",{ 
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
            }
        });
    },[]);

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState(false);
        alert("You have logged out successfully");
        navigate("/login");
    }
    return (
        <div>
            <div>
                {profile.map((value,key) =>{
                    return(
                        <div>
                            {value.username} <br></br> Completed workouts: {completedWorkouts}
                        </div>
                        
                    )
                })}
            </div>
            <button onClick={logout}>
                Logout
            </button>
        </div>
           
    )
    
}

export default Profile;
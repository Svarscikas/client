import React, {useState, useEffect} from 'react'
import axios from 'axios';

function Leaderboard() {
  const [bestLifts, setBestLifts] = useState([]);

  useEffect(() => {
    axios.get('https://workout-tracker-server-app.onrender.com/exercises/personalbests').then( (response) =>{
      setBestLifts(response.data)     //console.log(response.data);
    });
   },[])

  return (
    <main>
        <div className='Header'>Leaderboard</div>
          <div className='Card'>
            <h2 className='WorkoutTitle'>Best Lifts
            </h2>
              <div>
                {bestLifts.length > 0 && 
                  <table className='exerciseTable'>
                  <tr>
                    <th>Exercise</th>
                    <th>Weight</th>
                    <th>User</th>
                  </tr>
                    {bestLifts.map((value,key) => {
                      return(
                        <tr>
                          <td>{value.exercise}</td>
                          <td>{value.weight} kg</td>
                          <td>{value.username}</td>                       
                        </tr>
                      )
                    })}
                </table>
                }
                {bestLifts.length == 0 &&
                <div style={{textAlign: "center"}}>No data</div>
                }
              </div>
          </div>
    </main>
  )
}
export default Leaderboard;
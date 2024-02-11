import React, { useEffect } from 'react';

const PlayerProfile = ({data}) => {
  
  useEffect(() =>{
    console.log(data);
    
  }, [data]);
  return (
    <div className="player-profile">
      <table>
        <tbody>
          <tr>
            <td rowSpan="3">
              {/* Replace with an actual image tag and source */}
              <img src="path_to_image.jpg" alt="Player" />
            </td>
            <td>Name: {data.name}</td>
            <td>Height</td>
            <td>Weight</td>
            <td>Position</td>
          </tr>
          <tr>
            <td colSpan="4">Team Name</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};


export default PlayerProfile;

import React, { useState, useEffect } from 'react';
import './PlayerProfile.css';

const profiledata = require('./profiledata.json');

const PlayerProfile = ({ player }) => {
  const [profile, setProfile] = useState({
    name: "",
    height: "",
    weight: 0,
    position: "",
    team: ""
  });
  const [imageUrl, setImageUrl] = useState(''); // imageUrl is now part of the state

  useEffect(() => {
    for (let i = 0; i < profiledata.length; i++) {
      if (profiledata[i].name === player) {
        setImageUrl('https://cdn.nba.com/headshots/nba/latest/1040x760/'+profiledata[i].id+'.png')
        setProfile({
          name: profiledata[i].name,
          height: profiledata[i].height,
          weight: profiledata[i].weight,
          position: profiledata[i].position,
          team: profiledata[i].team
        })
        break;
      }
    }
  }, [player]);
  if(imageUrl === "" || !player){
    return(
      <></>
    )
  }
  return (
    <div className="player-profile">
      <table>
        <tbody>
          <tr>
            <td rowSpan="3" id='imgcell'><img style = {{width: "200px", padding: "0px", margin: "0px"}} src={ imageUrl } alt="Player"/></td>
            <td colSpan="3">{profile.name}</td>
          </tr>
          <tr>
            <td>{profile.height}</td>
            <td>{profile.weight}</td>
            <td>{profile.position}</td>
          </tr>
          <tr>
            <td colSpan="3">{profile.team}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PlayerProfile;

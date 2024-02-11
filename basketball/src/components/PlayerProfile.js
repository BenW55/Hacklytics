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
      if (profiledata[i].name === player.name) {
      setImageUrl('https://cdn.nba.com/headshots/nba/latest/1040x760/'+profiledata[i].id+'.png');
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

  return (
    <div className="player-profile">
      <table>
        <tbody>
          <tr>
            <td rowSpan="3"><img style={{ width: "200px" }} src={imageUrl} alt="No Image Available"/>
            </td>
            <td colSpan="3">{profile.name}</td>
          </tr>
          <tr>
            <td>{profile.height}</td>
            <td>{profile.weight} lbs</td>
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

import React, { useState, useEffect } from 'react';
import './PlayerProfile.css';

const pictureids = require('./pictureids.json');
let url = '';

const PlayerProfile = ({ player }) => {
  const [profile, setProfile] = useState({
    name: "",
    id: 0,
    height: "",
    weight: 0,
    position: "",
    team: ""
  });
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    // Fetch player data when `player` prop changes
    if(player && player.name){
      const playerName = player.name.toLowerCase();
      fetch(`https://www.balldontlie.io/api/v1/players?search=${playerName.split(' ')[0]}&per_page=100`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(j => {
          j.data.forEach(item => {
            if (item.first_name.toLowerCase() === playerName.split(' ')[0] && item.last_name.toLowerCase() === playerName.split(' ')[1]) {
              let nameFromSplit = playerName;
              let idObject = pictureids.find(p => p.name.toLowerCase() === nameFromSplit.toLowerCase());
              let id = idObject ? idObject.id : null;


              let imageUrl = 'https://cdn.nba.com/headshots/nba/latest/1040x760/' + id + '.png';

              setProfile({
                name: item.first_name + " " + item.last_name,
                id: id,
                height: item.height_feet + "'" + item.height_inches + '"',
                weight: item.weight_pounds,
                position: item.position,
                team: item.team.full_name
              });
              console.log(imageUrl);
              setImageUrl(imageUrl); // Set image URL state
            }
          });
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [player]); // Depend on `player` prop

  return (
    <div className="player-profile">
      <table>
        <tbody>
          <tr>
            <td rowSpan="3"><img style = {{width: "200px"}} src={ imageUrl } alt="Player"/></td>
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

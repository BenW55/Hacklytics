import React, { useState, useEffect } from 'react';
import './PlayerProfile.css';

const pictureids = require('./pictureids.json');
let url = '';

const PlayerProfile = ({ name }) => {
  const [profile, setProfile] = useState({
    name: "",
    id: 0,
    height: "",
    weight: 0,
    position: "",
    team: ""
  });

  useEffect(() => {
    fetch(`https://www.balldontlie.io/api/v1/players?search=${name.split(' ')[0]}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(j => {
        j.data.forEach(item => {
          if (item.first_name === name.split(' ')[0] && item.last_name === name.split(' ')[1]) {
            let nameFromSplit = (name.split(' ')[0] + " " + name.split(' ')[1]).toLowerCase()
            let id = null;
            for (let i = 0; i < pictureids.length; i++) {
              if (pictureids[i].name === nameFromSplit) {
                id = pictureids[i].id;
                break;
              }
            }
            url = 'https://cdn.nba.com/headshots/nba/latest/1040x760/'+id+'.png'

            setProfile({
              name: name.split(' ')[0] + " " + name.split(' ')[1],
              id: id,
              height: item.height_feet + "'" + item.height_inches + '"',
              weight: item.weight_pounds,
              position: item.position,
              team: item.team.full_name
            });
          }
        });
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [name]);

  return (
    <div className="player-profile">
      <table>
        <tbody>
          <tr>
            <td rowSpan="3"><img style = {{width: "200px"}} src={ url } alt="Player"/></td>
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
}

export default PlayerProfile;

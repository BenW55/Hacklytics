import React, { useState, useEffect } from 'react';

const Dropdown = ({data, onPlayerSelected}) => {
  
  const [seasons, setSeasons] = useState(data); // Example seasons
  const [selectedSeason, setSelectedSeason] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');

  // Fetch teams when a season is selected
  useEffect(() => {
    //console.log(seasons);
    if (selectedSeason) {
      fetchTeamsForSeason().then(teams => {
        setTeams(teams);
        setSelectedTeam(''); // Reset team selection
        setSelectedPlayer('');
      });
      setPlayers([]); // Reset players list
      onPlayerSelected({ shotData : []});
    }
  }, [selectedSeason]);

  // Fetch players when a team is selected
  useEffect(() => {
    if (selectedTeam) {
      fetchPlayersForTeam(selectedTeam ,selectedSeason).then(players => {
        setPlayers(players);
        setSelectedPlayer(''); // Reset player selection
        
      });
      onPlayerSelected({ shotData : []});
    } else {
      setPlayers([]); // Reset players list if no team is selected
    }
  }, [selectedTeam]);

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
   
  };

  const handlePlayerChange = (event) => {
    const newSelectedPlayer = event.target.value;
    setSelectedPlayer(newSelectedPlayer);

    // Call the callback function with the selected player
    if (onPlayerSelected) {
      try{
        const url = new URL('http://localhost:8000/playerdata');
        url.searchParams.append('player', newSelectedPlayer);
        url.searchParams.append('season', selectedSeason);
        const toReturn = fetch(url)
        .then((response) => response.json())
        .then((shotData) => {
          onPlayerSelected(shotData);
        });
      }catch(error){
        console.error(error);
      }
      
    }
  };

  return (
    <div style={{ width: '500px', height: '64px' }} >
      <div>
        <label>Season:
          <select value={selectedSeason} onChange={handleSeasonChange}>
            <option value="">Select a Season</option>
            {seasons.map((season) => (
              <option key={season} value={season}>{season}</option>
            ))}
          </select>
        </label>
      </div>
      {selectedSeason && (
        <div>
          <label>Team:
            <select value={selectedTeam} onChange={handleTeamChange} disabled={!teams.length}>
              <option value="">Select a Team</option>
              {teams.map((team, index) => (
                <option key={index} value={team}>{team}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      {selectedTeam && (
        <div>
          <label>Player:
            <select value={selectedPlayer} onChange={handlePlayerChange} disabled={!players.length}>
              <option value="">Select a Player</option>
              {players.map((player, index) => (
                <option key={index} value={player}>{player}</option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

// Example API call functions
async function fetchTeamsForSeason() {
  // Simulate fetching teams for the selected season
  // Replace this with your actual API call
  try{
    const url = new URL('http://localhost:8000/teams/');
    const toReturn = await fetch(url)
    .then((response) => response.json())
    .then((teams) => teams);
    return toReturn['teams'];
  }catch(error){
    console.error(error);
  }
}

async function fetchPlayersForTeam(team, season) {
  // Simulate fetching players for the selected team
  // Replace this with your actual API call
  try{

    const url = new URL('http://localhost:8000/players/');
    url.searchParams.append('team', team);
    url.searchParams.append('season', season);
    const toReturn = await fetch(url)
    .then((response) => response.json())
    .then((data) => data);
    return toReturn['data'];
  }catch(error){
    console.error(error);
  }
}

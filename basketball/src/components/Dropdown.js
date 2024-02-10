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
    if (selectedSeason) {
      fetchTeamsForSeason(selectedSeason).then(setTeams);
      setSelectedTeam(''); // Reset team selection
      setPlayers([]); // Reset players list
    }
  }, [selectedSeason]);

  // Fetch players when a team is selected
  useEffect(() => {
    if (selectedTeam) {
      fetchPlayersForTeam(selectedTeam).then(setPlayers);
      setSelectedPlayer(''); // Reset player selection
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
        const toReturn = fetch('http://localhost:8000/playerdata')
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
    <div>
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
async function fetchTeamsForSeason(season) {
  // Simulate fetching teams for the selected season
  // Replace this with your actual API call
  try{
    const toReturn = await fetch('http://localhost:8000/teams')
    .then((response) => response.json())
    .then((teams) => teams);
    return toReturn['teams'];
  }catch(error){
    console.error(error);
  }
}

async function fetchPlayersForTeam(team) {
  // Simulate fetching players for the selected team
  // Replace this with your actual API call
  try{
    const toReturn = await fetch('http://localhost:8000/players')
    .then((response) => response.json())
    .then((players) => players);
    console.log(toReturn['players']);
    return toReturn['players'];
  }catch(error){
    console.error(error);
  }
}

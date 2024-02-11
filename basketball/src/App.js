import React from 'react';
import BasketballCourt from './components/BasketballCourt';
import Dropdown from './components/Dropdown';
import './App.css';
import PlayerProfile from './components/PlayerProfile';

// Example data - replace this with your actual shot data
const seasonsData = ["2017-18", "2018-19", "2019-20", "2020-21", "2021-22"];

function App() {
  const [shotDataPlayer1, setShotDataPlayer1] = React.useState([]);
  const [shotDataPlayer2, setShotDataPlayer2] = React.useState([]);
  const [showSecondPlayer, setShowSecondPlayer] = React.useState(false);
  const [player1, setPlayer1] = React.useState({});
  const [player2, setPlayer2] = React.useState({});

  const handlePlayerSelected = (identifier) => (data) => {
    //const playerData = data['shotData'][0] || {};
    if (identifier === 'player1') {
      setShotDataPlayer1(data['shotData']);
      
      //console.log(data['shotData'][0].player);
      var test = data['shotData'][0].player
      setPlayer1({name: test});
      
      //console.log(shotDataPlayer1[0].player);
    } else if (identifier === 'player2') {
      setShotDataPlayer2(data['shotData']);
      var test = data['shotData'][0].player
      setPlayer2({name: test});
    }
  };
  const toggleSecondPlayer = () => {
    setShowSecondPlayer(!showSecondPlayer);
    // If we're hiding the second player, also clear its shot data
    if (showSecondPlayer) {
      setShotDataPlayer2([]);
    }
  };

  return (
    <div className="App">
      <h1>Basketball Shot Chart</h1>
      <div className="players-container">
        <div className="player">
          <Dropdown data={seasonsData} onPlayerSelected={handlePlayerSelected('player1')} identifier="player1" />
          <BasketballCourt data={shotDataPlayer1} />
        </div>
        {showSecondPlayer && (
          <div className="player">
            <Dropdown data={seasonsData} onPlayerSelected={handlePlayerSelected('player2')} identifier="player2" />
            <BasketballCourt data={shotDataPlayer2} />
          </div>
        )}
      </div>
      <button onClick={toggleSecondPlayer}>
        {showSecondPlayer ? '- Remove Player' : '+ Add Player'}
      </button>
      <div>
        <PlayerProfile player={player1}></PlayerProfile>
      </div>
      {showSecondPlayer && (
          <div>
            <PlayerProfile player={player2}></PlayerProfile>
          </div>
        )}
    </div>
  );
}


export default App;
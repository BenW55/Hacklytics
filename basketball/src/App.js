import React from 'react';
import BasketballCourt from './components/BasketballCourt';
import Dropdown from './components/Dropdown';
import './App.css';

// Example data - replace this with your actual shot data
const seasonsData = ["2017-18", "2018-19", "2019-20", "2020-21", "2021-22"];

function App() {
  const [shotDataPlayer1, setShotDataPlayer1] = React.useState([]);
  const [shotDataPlayer2, setShotDataPlayer2] = React.useState([]);
  const [showSecondPlayer, setShowSecondPlayer] = React.useState(false);

  const handlePlayerSelected = (identifier) => (data) => {
    if (identifier === 'player1') {
      console.log(data['shotData']);
      setShotDataPlayer1(data['shotData']);
    } else if (identifier === 'player2') {
      setShotDataPlayer2(data['shotData']);
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
    </div>
  );
}


export default App;
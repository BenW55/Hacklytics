import React, { useState } from 'react';
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
  const [shotTypesPlayer1, setShotTypesPlayer1] = useState({
    rim: true,
    floater: true,
    mid: true,
    three: true
  });
  const [shotTypesPlayer2, setShotTypesPlayer2] = useState({
    rim: true,
    floater: true,
    mid: true,
    three: true
  });

  const handlePlayerSelected = (identifier) => (data) => {
    if (identifier === 'player1') {
      console.log(data['shotData']);
      setShotDataPlayer1(data['shotData']);
      if (data['shotData'].length === 0) {
        setPlayer1({}); // Reset player1 if shotData is empty
      } else {
        var test = data['shotData'][0].player
        setPlayer1({ name: test });
      }
    } else if (identifier === 'player2') {
      setShotDataPlayer2(data['shotData']);
      if (data['shotData'].length === 0) {
        setPlayer2({}); // Reset player2 if shotData is empty
      } else {
        var test = data['shotData'][0].player
        setPlayer2({ name: test });
      }
    }
  };

  const toggleSecondPlayer = () => {
    setShowSecondPlayer(!showSecondPlayer);
    if (!showSecondPlayer) {
      setShotDataPlayer2([]);
      setPlayer2({});
    }
  };

  const toggleShotTypePlayer1 = (type) => {
    setShotTypesPlayer1(prevState => ({
      ...prevState,
      [type]: !prevState[type]
    }));
  };

  const toggleShotTypePlayer2 = (type) => {
    setShotTypesPlayer2(prevState => ({
      ...prevState,
      [type]: !prevState[type]
    }));
  };

  return (
    <div className="App">
      <h1>Basketball Shot Chart</h1>
      <div className="players-container">
        <div className="player">
          <Dropdown data={seasonsData} onPlayerSelected={handlePlayerSelected('player1')} identifier="player1" />
          <BasketballCourt class="basket_data" data={shotDataPlayer1} rim={shotTypesPlayer1.rim} floater={shotTypesPlayer1.floater} mid={shotTypesPlayer1.mid} three={shotTypesPlayer1.three}/>
        </div>
        {showSecondPlayer && (
          <div className="player">
            <Dropdown data={seasonsData} onPlayerSelected={handlePlayerSelected('player2')} identifier="player2" />
            <BasketballCourt class="basket_data" data={shotDataPlayer2} rim={shotTypesPlayer2.rim} floater={shotTypesPlayer2.floater} mid={shotTypesPlayer2.mid} three={shotTypesPlayer2.three}/>
          </div>
        )}
      </div>
      <div className="controls">
        <button onClick={() => toggleShotTypePlayer1('rim')}>
          {shotTypesPlayer1.rim ? 'Disable Rim (P1)' : 'Enable Rim (P1)'}
        </button>
        <button onClick={() => toggleShotTypePlayer1('floater')}>
          {shotTypesPlayer1.floater ? 'Disable Floater (P1)' : 'Enable Floater (P1)'}
        </button>
        <button onClick={() => toggleShotTypePlayer1('mid')}>
          {shotTypesPlayer1.mid ? 'Disable Mid (P1)' : 'Enable Mid (P1)'}
        </button>
        <button onClick={() => toggleShotTypePlayer1('three')}>
          {shotTypesPlayer1.three ? 'Disable Three (P1)' : 'Enable Three (P1)'}
        </button>
        {showSecondPlayer && (
          <div className="controls">
            <button onClick={() => toggleShotTypePlayer2('rim')}>
              {shotTypesPlayer2.rim ? 'Disable Rim (P2)' : 'Enable Rim (P2)'}
            </button>
            <button onClick={() => toggleShotTypePlayer2('floater')}>
              {shotTypesPlayer2.floater ? 'Disable Floater (P2)' : 'Enable Floater (P2)'}
            </button>
            <button onClick={() => toggleShotTypePlayer2('mid')}>
              {shotTypesPlayer2.mid ? 'Disable Mid (P2)' : 'Enable Mid (P2)'}
            </button>
            <button onClick={() => toggleShotTypePlayer2('three')}>
              {shotTypesPlayer2.three ? 'Disable Three (P2)' : 'Enable Three (P2)'}
            </button>
          </div>
        )}
        <button onClick={toggleSecondPlayer}>
          {showSecondPlayer ? '- Remove Player' : '+ Add Player'}
        </button>
      </div>
      <div className="stats-container">
        <div className="stat">
          <PlayerProfile player={player1.name} />
        </div>
        {showSecondPlayer && (
          <div className="stat">
            <PlayerProfile player={player2.name} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

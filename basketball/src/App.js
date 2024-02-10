import React from 'react';
import BasketballCourt from './components/BasketballCourt';
import Dropdown from './components/Dropdown';
import './App.css';

// Example data - replace this with your actual shot data
const seasonsData = [2023,2024];

function App() {
    // Assume seasonsData is already defined and set up
    const [shotData, setShotData] = React.useState([]);

    const handlePlayerSelected = async (data) => {
      console.log(data['shotData']);
      setShotData(data['shotData']);
    };
  

  return (
    <div className="App">
      <div>
        <h1>Basketball Shot Chart</h1>
        <Dropdown data={seasonsData} onPlayerSelected={ handlePlayerSelected}/>
      </div>
      <div>
        <BasketballCourt data={shotData} />
      </div>
      {/* Other components and content can go here */}
      
    </div>
  );
}

export default App;
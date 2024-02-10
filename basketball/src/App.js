import React from 'react';
import BasketballCourt from './components/BasketballCourt';
import Dropdown from './components/Dropdown';
// Example data - replace this with your actual shot data
const seasonsData = [2017_2018, 2018_2019, 2019_2020, 2020_2021, 2021_2022];

function App() {
    // Assume seasonsData is already defined and set up
    const [shotData, setShotData] = React.useState([]);

    const handlePlayerSelected = async (data) => {
      console.log(data['shotData']);
      setShotData(data['shotData']);
    };
  

  return (
    <div className="App">
      <Dropdown data={seasonsData} onPlayerSelected={ handlePlayerSelected}/>
      <h1>Basketball Shot Chart</h1>
      <BasketballCourt data={shotData} />
      {/* Other components and content can go here */}
      
    </div>
  );
}

export default App;
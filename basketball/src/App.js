import React from 'react';
import BasketballCourt from './components/BasketballCourt';

// Example data - replace this with your actual shot data
const shotData = [
  { x: 23.9, y: 13, made: true },
  { x: 25, y: 47.75, made: true },
  { x: 25, y: 0, made: true },
  // ... more shots
];

function App() {
  return (
    <div className="App">
      <h1>Basketball Shot Chart</h1>
      <BasketballCourt data={shotData} />
      {/* Other components and content can go here */}
    </div>
  );
}

export default App;

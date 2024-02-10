const express = require('express');
const fs = require('fs').promises; // Note: Using promises version for async/await
const path = require('path');
const router = express.Router();

router.get('/', async (req,res) => {
  //replace with mongoDB call
  try {
    const dataDir = path.join(__dirname, 'json_data.json'); // Correctly defining the directory path

    const file = await fs.readFile(dataDir, 'utf-8'); // Correctly using 'await' within async function



    res.json({ data : file });
  } catch (error) {
    console.error('Error reading data directory:', error);
    res.status(500).send('Server error');
  }
});

router.get('/teams', async (req,res) => {
  //replace with mongoDB call
  try {

    res.json({ teams : ['Lakers', 'Warriors'] });
  } catch (error) {
    console.error('Error reading data directory:', error);
    res.status(500).send('Server error');
  }
});
router.get('/players', async (req,res) => {
  //replace with mongoDB call
  try {

    res.json({ players : ['Player A', 'Player B', 'Player C'] });
  } catch (error) {
    console.error('Error reading data directory:', error);
    res.status(500).send('Server error');
  }
});
router.get('/playerdata', async (req,res) => {
  //replace with mongoDB call
  try {

    res.json({ shotData : [
      { x: 23.9, y: 13, player:"player1", made: true },
      { x: 25, y: 47.75, player:"player2", made: true },
      { x: 25, y: 10, player:"player3", made: true },
      
    ] });
  } catch (error) {
    console.error('Error reading data directory:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
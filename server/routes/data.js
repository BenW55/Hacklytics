const express = require('express');
const fs = require('fs').promises; // Note: Using promises version for async/await
const path = require('path');
const router = express.Router();

// Import mongo db dataset
const { MongoClient } = require("mongodb");
const { NONAME } = require('dns');
// connection string.
const uri = "mongodb+srv://bigshaq:FGdvZXvULQ3kGY3B@nbashotdata.sqfjle1.mongodb.net/";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }}
const db = client.db("shot_data")
const coll = db.collection("main");

run().catch(console.dir);
async function search(params) {
  try {
    // Get one document from the collection
    const doc = await coll.findOne(params);

    // Create an output object
    const output = {
      x: doc.shotX,
      y: doc.shotY,
      made: doc.made
    };

    // Return the output
    return output;
  } catch (error) {
    // Handle errors
    console.error(`Error searching ${params} `);
    throw error;
  }
}


router.get('/', async (req,res) => {
  res.json({data : None});
});


// Get a list of teams based on an input of year
router.get('/teams', async (req, res) => {
  const season = req.query.season; // Assuming you are filtering by season
  /** */
  try {
    // Build your query based on the season, if provided
    const query = season ? { season: season } : {};

    // Find documents based on the query
    const cursor = coll.find();

    // Initialize a Set to store unique team names
    const uniqueTeams = new Set();
    var BreakException = {};
    // Process each document
    
    while (await cursor.hasNext() && uniqueTeams.size < 30) {
      const doc = await cursor.next();
      uniqueTeams.add(doc.team);

    // If we have 30 teams, break out of the loop
      if (uniqueTeams.size === 30) {
        break;
      }
    }
    

    //console.log(uniqueTeams);
    // Once all documents have been processed, convert the Set to an array and send the response
    res.json({ teams: Array.from(uniqueTeams) });
  } catch (error) {
    console.error('Error reading database:', error);
    res.status(500).send('Server error');
  }
});


router.get('/players', async (req, res) => {
    try {
    const teamName = req.query.team;
    if (!teamName) {
      return res.status(400).send('Team query parameter is required');
    }

    // Assuming 'coll' is your MongoDB collection
    const query = { team: teamName };
    const cursor = coll.find(query);
    
    // Create an array to hold players from the same team
    let playersFromSameTeam = new Set();
    
    // Fetch all documents that match the query
    await cursor.forEach(doc => {
      // Assuming 'player' is the field name that holds the player's name
      // Add this document's player to the array
      playersFromSameTeam.add(doc.player);
    });
    

    res.json({ data: Array.from(playersFromSameTeam) });
} catch (error) {
    console.error('Error reading database:', error);
    res.status(500).send('Server error');
  }
});



router.get('/playerdata', async (req,res) => {
  const player_data = db.collection("player_data");
  const player = req.query.player;
  console.log(player);
  try {

    const stats = player_data.find(
      { player: player }, // Query to filter documents based on the team
      {match_id: 0, distance: 0 } // Projection to include only the playerName field and exclude the _id field
   )
   
    res.json({ shotData : [
      { x: stats.shotX, y: stats.shotY, player: stats.player, made: true },
    ] });
  } catch (error) {
    console.error('Error reading data directory:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
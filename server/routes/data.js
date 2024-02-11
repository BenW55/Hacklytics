const express = require('express');
const fs = require('fs').promises; // Note: Using promises version for async/await
const path = require('path');
const router = express.Router();

// Import mongo db dataset
const { MongoClient } = require("mongodb");
const { NONAME } = require('dns');
// connection string.
const uri = "mongodb+srv://rowea87:ko60iYOJdOOJaaZi@shotsnba.pcgsnse.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }}
const db = client.db("shot_data")
const coll = db.collection("main");
const playerData = db.collection("player_season_teams");
run().catch(console.dir);
async function search(params) {x
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


    // while (await cursor.hasNext() && uniqueTeams.size < 30) {
    //   const doc = await cursor.next();
    //   uniqueTeams.add(doc.team);

    // // If we have 30 teams, break out of the loop
    //   if (uniqueTeams.size === 30) {
    //     break;
    //   }
    // }
    

    //console.log(uniqueTeams);
    // Once all documents have been processed, convert the Set to an array and send the response
    res.json({ teams: ["BOS", "CLE", "HOU", "GSW", "MIL", "ATL", "DAL", "CHO", "DET", "BRK", "IND", "NOP",
    "MEM", "MIA", "ORL", "POR", "PHO", "SAC", "MIN", "SAS", "DEN", "UTA", "PHI", "WAS",
    "LAC", "LAL", "NYK", "OKC", "CHI", "TOR"] });
  });


router.get('/players', async (req, res) => {
  const teamName = req.query.team;
  const season = req.query.season; // Assuming you are filtering by season
    try {
    if (!teamName) {
      return res.status(400).send('Team query parameter is required');
    }
    
    // Assuming 'coll' is your MongoDB collection
    const query = {};
    query[season] = teamName
    //const cursor = coll.find(query);
    const cursor = playerData.find(query);

    // Create an array to hold players from the same team
    let playersFromSameTeam = new Set();
    console.log(performance.now);
    // Fetch all documents that match the query
    let c = 0
    await cursor.forEach((doc, index) => {
      // Assuming 'player' is the field name that holds the player's name
      // Add this document's player to the array
      console.log(c);
      c++;
      playersFromSameTeam.add(doc.player);
    });
    console.log(performance.now);
    

    res.json({ data: Array.from(playersFromSameTeam) });
} catch (error) {
    console.error('Error reading database:', error);
    res.status(500).send('Server error');
  }
});



router.get('/playerdata', async (req,res) => {
  console.log(performance.now);
  const player_data = db.collection("main");
  const player = req.query.player;
  const season = req.query.season;
  console.log(season);
  try {

    let shots = [];
    const cursor = player_data.find(
      {player: player, season: season }, // Query to filter documents based on the team
      //{match_id: 0, distance: 0, shotX: 0, shotY: 0 } // Projection to include only the playerName field and exclude the _id field
   )

   await cursor.forEach((doc, index) => {
    
    // Assuming 'player' is the field name that holds the player's name
    // Add this document's player to the array

    shots.push({x: doc.shotX, y: doc.shotY, player: doc.player, made: doc.made})
  });

    res.json({ shotData : shots });
  } catch (error) {
    console.error('Error reading data directory:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
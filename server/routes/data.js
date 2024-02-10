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

  try {
    // Build the aggregation pipeline
    let pipeline = [
      // Optionally match documents if a season is provided
      ...(season ? [{ $match: { season: season } }] : []),
      // Group by team to get unique teams
      { $group: { _id: "$team" } },
      // Project to get the team name in the desired format
      { $project: { team: "$_id", _id: 0 } },
    ];
    
    const results = await coll.aggregate(pipeline).toArray();
    console.log(results);  
    // If you must limit to 30 unique teams (handled in application logic)
    const limitedResults = results.slice(0, 30);

    // Send the response
    res.json({ teams: limitedResults.map(result => result.team) });
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
      {_id: 0, distance: 0 } // Projection to include only the playerName field and exclude the _id field
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
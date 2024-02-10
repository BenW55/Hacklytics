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
  const season = req.query.season;
  
  try {
    // Pipeline stages for aggregation
    const pipeline = [];
    
    // Match stage to filter by season if provided
    if (season) {
      pipeline.push({ $match: { season: season } });
    }
    
    // Group stage to group by team
    pipeline.push({ $group: { _id: "$team" } });
    
    // Limit stage to limit the number of results
    pipeline.push({ $limit: 30 });
    
    // Execute the aggregation pipeline
    const result = await coll.aggregate(pipeline).toArray();
    
    // Extract team names from the result
    const teams = result.map(item => item._id);
    
    res.json({ teams });
  } catch (error) {
    console.error('Error reading database:', error);
    res.status(500).send('Server error');
  }
});

router.get('/players', async (req,res) => {
    try{
      // get one block from the collection with that team
      const team = req.query.team;
      const cursor = player_data.find(
        { team: team }, // Query to filter documents based on the team
        { match_id: 0, distance: 0, shotX: 0, shotY: 0, made: 0 } // Projection to include only the playerName field and exclude the _id field
     )
      res.json({data : cursor});
    }
    catch (error) {
      // Handle errors
      console.error('Error reading database8:', error);
      throw error;
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
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
    
    // Perform operations with your collection here

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }}
const coll = client.db("shot_data").collection("main");

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
router.get('/teams', async (req,res) => {

  //replace with mongoDB call
  const season = req.query.season;
  try{
    // get one block from the collection with that team
    // Get all data for the specified year
    //params = {year: req.year};
    const cursor = await coll.find();
    // Return a unique list of all teams from doc
    const uniqueTeams = new Set();
    //console.log(cursor);
    cursor.forEach(doc => {
      console.log(doc.team);
      uniqueTeams.add(doc.team);
    });
    
    res.json({teams : uniqueTeams});
  }
  catch (error) {
    // Handle errors
    console.error('Error reading database:', error);
    throw error;
  }
  
});


router.get('/players', async (req,res) => {
    try{
      // get one block from the collection with that team
      const team = req.query.team;
      params = {player: req.player};
      const output = search(params);
      res.json({data : doc});
    }
    catch (error) {
      // Handle errors
      console.error('Error reading database8:', error);
      throw error;
    }
});


router.get('/playerdata', async (req,res) => {
  //replace with mongoDB call
  const player = req.query.player;
  console.log(player);
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
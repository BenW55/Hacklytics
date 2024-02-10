const express = require('express');
const { MongoClient } = require("mongodb");

const router = express.Router();

// MongoDB connection setup
const uri = "mongodb+srv://bigshaq:FGdvZXvULQ3kGY3B@nbashotdata.sqfjle1.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db; // MongoDB database reference

async function connectDB() {
  try {
      await client.connect();
      console.log("Connected to MongoDB");
      db = client.db("shot_data");
  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1); // Exit process on connection failure
  }
}

connectDB();

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

// Route to get unique teams
router.get('/teams', async (req, res) => {
    try {
        const coll = db.collection("updated1");
        const uniqueTeams = await coll.distinct("team");
        res.json({ data: uniqueTeams });
    } catch (error) {
        next(error); // Pass error to error handling middleware
    }
});

// Route to get players for a team
router.get('/players', async (req, res) => {
    try {
        const player_data = db.collection("player_data");
        const team = req.query.team;
        const cursor = await player_data.find({ team }, { projection: { match_id: 0, distance: 0, shotX: 0, shotY: 0, made: 0 } });
        const players = await cursor.toArray();
        res.json({ data: players });
    } catch (error) {
        next(error); // Pass error to error handling middleware
    }
});

// Route to get shot data for a player
router.get('/playerdata', async (req, res) => {
    try {
        const player_data = db.collection("player_data");
        const player = req.query.player;
        const stats = await player_data.findOne({ player }, { projection: { match_id: 0, distance: 0 } });
        res.json({ shotData: [{ x: stats.shotX, y: stats.shotY, player: stats.player, made: true }] });
    } catch (error) {
        next(error); // Pass error to error handling middleware
    }
});

module.exports = router;

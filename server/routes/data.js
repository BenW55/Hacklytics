const express = require('express');
const fs = require('fs').promises; // Note: Using promises version for async/await
const path = require('path');
const router = express.Router();

router.get('/', async (req,res) => {
  try {
    const dataDir = path.join(__dirname, 'json_data.json'); // Correctly defining the directory path
    
    const file = await fs.readFile(dataDir, 'utf-8'); // Correctly using 'await' within async function
    
    
    
    res.json({ data : file });
  } catch (error) {
    console.error('Error reading data directory:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
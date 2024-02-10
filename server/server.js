const express = require('express');
const cors = require('cors');
const dataRoutes = require('./routes/data');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/',dataRoutes);

app.get('/data', (req, res) => {
  // Mock data
  const data = [{ name: 'A', value: 30 }, { name: 'B', value: 80 }];
  res.json(data);
});


app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
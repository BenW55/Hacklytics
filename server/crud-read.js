const { MongoClient } = require("mongodb");
// connection string.
const uri = "mongodb+srv://bigshaq:FGdvZXvULQ3kGY3B@nbashotdata.sqfjle1.mongodb.net/";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    // database and collection
    const db = client.db("shot_data");
    const coll = db.collection("main");

    // use .find() to retrieve all docs
    const cursor = coll.find();
    // iterate code goes here
    await cursor.forEach(console.log);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




const { MongoClient } = require("mongodb");
// connection string.
const uri = "mongodb+srv://purplepeopleeater:QfSvBpAF9lYX86e9@cluster0.y2zjw5l.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    // database and collection
    const db = client.db("NBAShotChart");
    const coll = db.collection("Data1");

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




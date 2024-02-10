const { MongoClient } = require("mongodb");
// connection string.
const uri = "mongodb+srv://bigshaq:FGdvZXvULQ3kGY3B@nbashotdata.sqfjle1.mongodb.net/";
const client = new MongoClient(uri);
async function run() {
  try {
    console.time("executionTime"); // Start measuring execution time

    await client.connect();
    // database and collection
    const db = client.db("shot_data");
    const coll = db.collection("main");

    // Create an index on player

    // Define the search index pipeline
    const pipeline = [
      {
        $search: {
          index: "default",
          text: {
            query: "Lebron James",
            path: {
              wildcard: "*"
            }
          }
        }
      }
    ];

    // Execute the search index pipeline
    const cursor = await coll.aggregate(pipeline);

    await cursor.forEach(doc => {
      console.log(`shotX: ${doc.shotX}, shotY: ${doc.shotY}, made: ${doc.made}`);
  });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.timeEnd("executionTime"); // End measuring execution time

  }
}
run().catch(console.dir);




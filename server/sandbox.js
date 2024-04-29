require('dotenv').config();

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tsaqiffatih92:Bebek080320@tsaqiffatih.qe9hdgt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("sample_mflix").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// const { MongoClient } = require("mongodb");
 
// // Replace the following with your Atlas connection string                                                                                                                                        
// // const url = "mongodb+srv://tsaqiffatih92:Bebek080320@tsqiffatih.mongodb.net/?retryWrites=true&w=majority";
// const url = "mongodb+srv://tsaqiffatih92:Bebek080320@tsaqiffatih.qe9hdgt.mongodb.net/"

// // Connect to your Atlas cluster
// const client = new MongoClient(url);

// async function run() {
//     try {
//         await client.connect();
//         console.log("Successfully connected to Atlas");

//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }

// run().catch(console.dir);
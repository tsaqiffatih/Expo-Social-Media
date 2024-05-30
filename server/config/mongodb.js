require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri)
const database = client.db("phase-3")


module.exports = {
    client,
    database
}
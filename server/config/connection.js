require('dotenv').config();

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tsaqiffatih92:Bebek080320@tsaqiffatih.qe9hdgt.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri)
const database = client.db("sample_mflix")


module.exports = {
    client,
    database
}
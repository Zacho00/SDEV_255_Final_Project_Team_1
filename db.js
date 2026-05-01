const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb+srv://zthomas36_db_user:password255@sdev255.2dkopmt.mongodb.net/?appName=SDEV255");

let db;

async function connectDB() {
    await client.connect();
    db = client.db("account_db");
}

connectDB();
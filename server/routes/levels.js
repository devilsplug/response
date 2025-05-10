const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const authenticateToken = require('../middleware/authenticate');

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "bopimo";
let levelsCollection;

async function init() {
  await client.connect();
  const db = client.db(dbName);
  levelsCollection = db.collection("levels");
}
init();

router.get('/', authenticateToken, async (req, res) => {
  const levels = await levelsCollection.find({}).toArray();
  res.json(levels);
});

router.post('/', authenticateToken, async (req, res) => {
  const newLevel = { ...req.body, owner: req.user.username };
  const result = await levelsCollection.insertOne(newLevel);
  res.status(201).json(result.ops ? result.ops[0] : newLevel);
});

module.exports = router;

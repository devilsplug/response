const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const authenticateToken = require('../middleware/authenticate');

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "bopimo";
let avatarsCollection;

async function init() {
  await client.connect();
  const db = client.db(dbName);
  avatarsCollection = db.collection("avatars");
}
init();

router.get('/', authenticateToken, async (req, res) => {
  const avatars = await avatarsCollection.find({}).toArray();
  res.json(avatars);
});

router.post('/', authenticateToken, async (req, res) => {
  const newAvatar = { ...req.body, owner: req.user.username };
  const result = await avatarsCollection.insertOne(newAvatar);
  res.status(201).json(result.ops ? result.ops[0] : newAvatar);
});

module.exports = router;

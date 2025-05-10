const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "bopimo";
let usersCollection;

async function init() {
  await client.connect();
  const db = client.db(dbName);
  usersCollection = db.collection("users");
}
init();

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const userExists = await usersCollection.findOne({ username });
  if (userExists) return res.status(400).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await usersCollection.insertOne({ username, password: hashedPassword });
  res.status(201).json({ message: "User registered" });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await usersCollection.findOne({ username });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;

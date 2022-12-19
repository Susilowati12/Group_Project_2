const mongoose = require("mongoose");

const DB_URL =
  "mongodb://mongo:K31BVfR83AAGmYPaepPn@containers-us-west-178.railway.app:6121";

const db = mongoose.connect(DB_URL);

module.exports = db;

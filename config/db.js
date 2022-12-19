const mongoose = require("mongoose");

const DB_URL =
  "mongodb://mongo:uJpI0mZD3p5iOPKDcHHC@containers-us-west-107.railway.app:6045";

const db = mongoose.connect(DB_URL);

module.exports = db;

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DB_USERNAME = process.env.mongoDBUsername;
const DB_PASSWORD = process.env.mongoDBPassword;
const dbName = process.env.dbName;

async function DBConnection() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@neog-cluster.d8w2z.mongodb.net/${dbName}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    console.log(`successfully connected to DB ${dbName}`);
  } catch (err) {
    console.error("DB Error", err);
  }
}

module.exports = DBConnection;

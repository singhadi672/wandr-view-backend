const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DB_USERNAME = process.env.mongoDBUsername;
const DB_PASSWORD = process.env.mongoDBPassword;
const dbName = "video-library";

async function DBConnection() {
  try {
    await mongoose.connect(
      `mongodb+srv://MongoDbUser:aditya1997@neog-cluster.d8w2z.mongodb.net/${dbName}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    console.log(`successfully connected to DB ${dbName}`);
  } catch (err) {
    console.error("DB Error", err);
  }
}

module.exports = DBConnection;

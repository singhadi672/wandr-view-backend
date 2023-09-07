const mongoose = require("mongoose");
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

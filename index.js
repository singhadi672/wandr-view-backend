const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: true });
});

app.listen(PORT, () => {
  console.log("server started on port", PORT);
});

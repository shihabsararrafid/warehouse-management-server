const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Using the middlewares
app.use(cors());
app.use(express.json());

// The main api
app.get("/", (req, res) => {
  res.send("The Server is running successfully but it is late for me");
});

app.listen(port, () => {
  console.log("This is running on the port", port);
});

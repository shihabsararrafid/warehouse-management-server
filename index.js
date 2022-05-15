const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Using the middlewares
app.use(cors());
app.use(express.json());
//connecting the mongo db

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2kgz6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  await client.connect();
  const itemsCollection = client.db("ElectraWarehouse").collection("Items");
  app.get("/item", async (req, res) => {
    const query = {};
    const cursor = itemsCollection.find(query);

    const result = await cursor.toArray();

    res.send(result);
  });
}
run().catch(console.dir);

// The main api
app.get("/", (req, res) => {
  res.send("The Server is running successfully but it is late for me");
});

app.listen(port, () => {
  console.log("This is running on the port", port);
});

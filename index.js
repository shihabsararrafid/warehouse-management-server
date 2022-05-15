const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
  app.get("/inventory", async (req, res) => {
    const query = {};
    const cursor = itemsCollection.find(query);

    const result = await cursor.toArray();

    res.send(result);
  });
  app.get("/inventory/:id", async (req, res) => {
    const itemId = req.params.id;
    const query = { _id: ObjectId(itemId) };
    const result = await itemsCollection.findOne(query);
    res.send(result);
  });
  app.put("/inventory/:id", async (req, res) => {
    const newQuantity = req.body.quantity;
    console.log(newQuantity);
    const itemId = req.params.id;
    const filter = { _id: ObjectId(itemId) };
    const options = { upsert: true };
    const updateddoc = {
      $set: {
        quantity: newQuantity,
      },
    };
    const result = await itemsCollection.updateOne(filter, updateddoc, options);
    console.log(result);
  });
}
run().catch(console.dir);

// The main api
app.get("/", (req, res) => {
  res.send(
    "The Server is running successfully and sometime heroku fail to serve my content"
  );
});

app.listen(port, () => {
  console.log("This is running on the port", port);
});

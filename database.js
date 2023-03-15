
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://<ChadBot>:<avon2023>@chadcluster.8ubdagy.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function APILimit(){
  client.connect(err => {
  const collection = client.db("API_Limits").collection("Rapid_API");
  client.close();
  return collection;
})
}

async function currentAPINum(){}

APILimit().catch(console.error);

module.exports = {APILimit, currentAPINum};

const { MongoClient, ServerApiVersion, Collection } = require('mongodb');
//import {MongoClient, ServerApiVersion } from "mongodb";
const uri = "mongodb+srv://ChadBot:avon2023@chadcluster.8ubdagy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const dbName = "API_Limits";
let APILim = null;
let APICur = null;
let doc = null;

//checks the API Limit of the specified API
async function APILimit(API) {
  //console.log("Connecting to database...");
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("Rapid_API");
    const myDoc = await col.findOne({Name: API});
    //console.log(myDoc.Limit);
    APILim = await myDoc.Limit;
    //module.exports = {APILim};
  } catch (err) {
    console.log("Database connection had ended due to an error.");
    console.log(`ERROR!! ${err}`);
  }finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    //console.log("Database connection has ended.");
  }
    return APILim;
}

//checks the current # of API uses of the specified API
async function APICurrent(API){
    //console.log("Connecting to database...");
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("Rapid_API");
    const myDoc = await col.findOne({Name: API});
    //console.log(myDoc.Current);
    APICur = await myDoc.Current;
    //module.exports = {APILim};
  } catch (err) {
    console.log("Database connection had ended due to an error.");
    console.log(`ERROR!! ${err}`);
  }finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    //console.log("Database connection has ended.");
  }
    return APICur;
}

//checks if you can use API, returns either TRUE or FALSE
async function CanUseAPI(API){
  let limit = await this.APILimit(API);
  let current = await this.APICurrent(API);

  if (current < limit){
    return true;
  } else {
    return false;
  }
}

//updates current # of API uses by adding 1
async function UpdateAPI(API){
  //console.log("Connecting to database...");
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("Rapid_API");

    let new currentNum = 1 + this.APICurrent(API);
    
   col.updateOne({Name: API},
      {                 
      $set: {
        Current: currentNum
      }
    })
  } catch (err) {
    console.log("Database connection had ended due to an error.");
    console.log(`ERROR!! ${err}`);
  }finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
} 

//exports functions to use
module.exports = {APILimit, APICurrent, CanUseAPI, UpdateAPI};
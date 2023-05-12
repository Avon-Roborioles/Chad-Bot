//run npm install firebase to work on device
//npm install -g firebase-tools
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBYRd8_A-tQXw3EN1_j0hyfdFUjH8RbPbg",
  authDomain: "chad-bot-a15df.firebaseapp.com",
  projectId: "chad-bot-a15df",
  storageBucket: "chad-bot-a15df.appspot.com",
  messagingSenderId: "997842399178",
  appId: "1:997842399178:web:babc83c20f44cd6508a933"
};

const app = initializeApp(firebaseConfig);


const { MongoClient, ServerApiVersion, Collection } = require('mongodb');
const url = process.env.databaseURL

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
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

    let currentNum = 1 + this.APICurrent(API);
    
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
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const { MongoClient } = require('mongodb');
const app = express()
dotenv.config()
const port = 3000

//middleware
app.use(cors())
app.use(bodyParser.json())

//connection url
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
client.connect()

// Database Name
const dbName = 'passop';

const db = client.db(dbName)
const collection = db.collection('passwords');

//Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})
//post all the passwords
app.post('/',async (req,res)=>{
    const {site,username,password,userid} = req.body
    collection.insertOne({site:site,username:username,password:password,userid:userid})
})
// delete all the passwords
app.delete('/:userid',(req,res)=>{
      const id = req.params.userid
      collection.deleteOne({userid:id})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const bodyParser = require("body-parser");
// Serve Angular app's static files
app.use(express.static(__dirname + '/public'));

const { MongoClient, ServerApiVersion } = require('mongodb');
const username = encodeURIComponent("jiahaoliu34");
const password = encodeURIComponent("!u-wwy,aeXB4aF-");
const uri = `mongodb+srv://${username}:${password}@jliu2620.t1nj4rp.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let mongoDBClient;
let wishlist;
async function connectToMongoDB() {
  try {
    mongoDBClient = await client.connect();
    const database = client.db('ebay');
    wishlist = database.collection('wishlist');
    
    console.log('Connected to MongoDB and got the wishlist collection.');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the application on connection error
  }
}

connectToMongoDB().then(() => {
  var autoCompleteRouter = require('./routes/autoComplete');
  var searchResultRouter = require('./routes/searchResult');
  var searchDetailRouter = require('./routes/searchDetail');
  var googleSearchEngineRouter = require('./routes/googleSearchEngine');
  var searchSimilarRouter = require('./routes/searchSimilar');
  var mongoDBRouter = require('./routes/mongoDB');
  app.use(bodyParser.json());                                                             
  app.use(cors());
  app.use('/autoComplete', autoCompleteRouter);
  app.use('/searchResult', searchResultRouter);
  app.use('/searchDetail', searchDetailRouter);
  app.use('/googleSearchEngine', googleSearchEngineRouter);
  app.use('/searchSimilar', searchSimilarRouter);
  app.use('/mongoDB', mongoDBRouter(wishlist));
  module.exports = app;
    
  const port = 8080;
  process.on('exit', () => {
      if (mongoDBClient) {
        mongoDBClient.close();
      }
    });
  app.listen(port, () => {
      console.log(`Server listening on the port::${port}`);
  });
  
});
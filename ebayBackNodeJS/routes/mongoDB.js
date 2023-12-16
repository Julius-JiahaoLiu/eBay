var express = require('express');
var router = express.Router();

module.exports = (wishlist) => {
  // Use 'wishlist' to interact with the MongoDB collection
  // wishlist.createIndex({ ItemID: 1 }, { unique: true })
  router.get('/checkWishList', async (req, res) => {
    try{
      const options = {
        projection: { _id: 0, ItemID: 1},
      };
      const cursor = wishlist.find({}, options);
      res.status(200).json(await cursor.toArray());
    }
    catch(error){
      res.status(500).json({ error: "External API response error" });
    }
  });
  router.get('/addWishList', async (req, res) => {
    try{
      const doc = {
        ItemID: req.query.ItemID,
        Image: req.query.Image,
        Title: req.query.Title,
        Price: req.query.Price,
        Shipping: req.query.Shipping,
        Zipcode: req.query.Zipcode,
        ConditionID: req.query.ConditionID,
      };
      const result = await wishlist.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.status(200).json({ message: 'Successfully inserted' });
    }
    catch(error){
      res.status(500).json({ error: "External API response error" });
    }
  });
  router.get('/removeWishList', async (req, res) => {
    try{
      const query = { ItemID: req.query.ItemID };
      const result = await wishlist.deleteOne(query);
      if(result.deletedCount === 1){
        console.log(`${result.deletedCount} document was deleted.`);
        res.status(200).json({ message: 'Successfully deleted' });
      }else{
        console.log("No documents matched the query. Deleted 0 documents.");
      }
    }
    catch(error){
      res.status(500).json({ error: "External API response error" });
    }
  });
  router.get('/getAllWishListItems', async (req, res) => {
    try{
      const options = {
        projection: { _id: 0, ItemID: 1, Image: 1, Title: 1, Price: 1, Shipping: 1, Zipcode: 1, ConditionID: 1},
      };
      const cursor = wishlist.find({}, options);
      res.status(200).json(await cursor.toArray());
    }
    catch(error){
      res.status(500).json({ error: "External API response error" });
    }
  });
  router.get('/getOneItem', async (req, res) => { 
    try{
      const query = { ItemID: req.query.ItemID };
      const options = {
        projection: { _id: 0, ItemID: 1, Image: 1, Title: 1, Price: 1, Shipping: 1, Zipcode: 1, ConditionID: 1},
      };
      const cursor = wishlist.find(query, options);
      res.status(200).json(await cursor.toArray());
    }
    catch(error){
      res.status(500).json({ error: "External API response error" });
    }
  });
  return router;
};


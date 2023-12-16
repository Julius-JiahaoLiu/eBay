var express = require('express');
var router = express.Router();
const axios = require('axios');  
const OAuthToken = require('../ebay_oauth_token');

router.get('/', async(req, res) =>{
    try{
        var itemId = req.query.itemId;
        const client_id = "JiahaoLi-CSCI571H-PRD-172bbdc3d-0143f126"
        let getSingleItemURL = 'https://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=' + client_id;
        getSingleItemURL += '&siteid=0&version=967&ItemID=' + itemId;
        getSingleItemURL += '&IncludeSelector=Description,Details,ItemSpecifics';
        const client_secret = "PRD-72bbdc3dbc07-4156-4bfe-b57b-00b6"
        const oauthToken = new OAuthToken(client_id, client_secret);
        const authHeaders = {'X-EBAY-API-IAF-TOKEN': await oauthToken.getApplicationToken(), 'Content-Type': 'application/json'};
        axios.get(getSingleItemURL, {headers: authHeaders}).then(response => {
            res.json(response.data);
        });
    }
    catch(error){
        res.status(500).json({ error: "External API response error" });

    }
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // axios.get(getSingleItemURL, {headers: authHeaders, json: true}, function (err, re, body) {
    //     if (err) {
    //         res.end("{}");
    //         console.log(err);
    //     }
    //     if (re.statusCode === 200) // body.status === "OK" is not working because body.status is undefined
    //     {
    //         res.send(body);
    //     } else {
    //         res.status(500).json({ error: "External API response error" });
    //     }
    // });
});
module.exports = router;
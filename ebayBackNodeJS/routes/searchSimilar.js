var express = require('express');
var router = express.Router();
var request= require('request');

router.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var itemId = req.query.itemId;
    var client_id = 'JiahaoLi-CSCI571H-PRD-172bbdc3d-0143f126'
    var url = 'https://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0';
    url += '&CONSUMER-ID=' + client_id + '&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemId=' + itemId + '&maxResults=20'; 
    request(url, function (err, re, body) {
        if (err) {
            res.end("{}");
            console.log(err);
        }
        if (re.statusCode === 200) // body.status === "OK" is not working because body.status is undefined
        {
            res.send(body);
        } else {
            res.status(500).json({ error: "External API response error" });
        }
    });
});

module.exports = router;
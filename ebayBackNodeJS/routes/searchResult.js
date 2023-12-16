var express = require('express');
var router = express.Router();
var request= require('request');

router.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var keyword = req.query.keyword;
    const categoryToId = {
        'Art': 550,
        'Baby': 2948,
        'Books': 267,
        'Clothing': 11450,
        'Computers': 58058,
        'Health': 26395,
        'Music': 11233,
        'Video': 1249
      };
    var categoryId = categoryToId[req.query.category] || 0;
    var newCond = req.query.newCond;
    var usedCond = req.query.usedCond;
    // var unspecifiedCond = req.query.condition.unspecified;
    var localPickup = req.query.localPickup;
    var freeShipping = req.query.freeShipping;
    var distance = req.query.distance;
    var zipCode = req.query.zipCode;

    var client_id = "JiahaoLi-CSCI571H-PRD-172bbdc3d-0143f126"
    var client_secret = "PRD-72bbdc3dbc07-4156-4bfe-b57b-00b6"
    var url = 'https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0'
                +'&SECURITY-APPNAME='+ client_id + '&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD' 
                +'&paginationInput.entriesPerPage=50'
                +'&keywords='+keyword
                +'&buyerPostalCode='+zipCode;
    if (categoryId !== 0) {
        url += '&categoryId='+categoryId;
    }
    url += '&itemFilter('+0+').name=MaxDistance&itemFilter('+0+').value='+distance;
    var i = 1;
    if(localPickup === 'true') {
        url += '&itemFilter('+i+').name=LocalPickupOnly&itemFilter('+i+').value=true';
        i++;
    }
    if(freeShipping === 'true') {
        url += '&itemFilter('+i+').name=FreeShippingOnly&itemFilter('+i+').value=true';
        i++;
    }
    if (newCond === 'true' || usedCond === 'true') {
        var j = 0;
        if(newCond === 'true') {
            url += '&itemFilter('+i+').name=Condition&itemFilter('+i+').value('+j+')=1000';
            j++;
        }
        if(usedCond === 'true') {
            url += '&itemFilter('+i+').name=Condition&itemFilter('+i+').value('+j+')=3000';
            j++;
        }
    }
    // console.log(url);
    request(url, { json: true }, function (err, re, body) {
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
router.get('/OnItemID', function(req, res) {
    var itemId = req.query.itemId;
    var client_id = "JiahaoLi-CSCI571H-PRD-172bbdc3d-0143f126"
    var url = 'https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0'
                +'&SECURITY-APPNAME='+ client_id + '&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD' 
                +'&paginationInput.entriesPerPage=50'
                +'&keywords='+itemId;
    request(url, { json: true }, function (err, re, body) {
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
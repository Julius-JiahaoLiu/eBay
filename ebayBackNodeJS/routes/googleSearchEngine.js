var express = require('express');
var router = express.Router();
var request= require('request');

router.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var keyword = req.query.keyword;
    var engineID = "b7747edef22e24ed6";
    var apiKey = "AIzaSyDYroIQ966N4u3_gKPDNdf4lUGlONH_CPQ";
    var url = 'https://www.googleapis.com/customsearch/v1?q='+keyword+'&cx=' + engineID + '&imgSize=huge&imgType=photo&num=8&searchType=image&key=' + apiKey;
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
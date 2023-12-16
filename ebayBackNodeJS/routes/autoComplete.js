var express = require('express');
var router = express.Router();
var request= require('request');

router.get('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var input = req.query.input;

  var url = 'http://api.geonames.org/postalCodeSearchJSON?username=jliu2620&country=US&maxRows=5&postalcode_startsWith=' + input;
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
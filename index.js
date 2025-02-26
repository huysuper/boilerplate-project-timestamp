// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

 
app.get("/api/", function (req, res) {
  let time = new Date();
  res.json({unix: time.getTime(), utc: time.toGMTString()});
});


app.get("/api/:date", function (req, res) {
  let date = req.params.date;
  let time
  if (Number(date)) {
    time = new Date(Number(date));
    res.json({unix: time.getTime(), utc: time.toGMTString()});
  } else {
    time = new Date(date);
  }
  if (!isNaN(time.getTime())) {
    res.json({unix: time.getTime(), utc: time.toGMTString()});
  } else {
    res.json({ error : "Invalid Date" });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

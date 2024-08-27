// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/1451001600000",(req, res)=>{
  const unix = Number("1451001600000");
  const utc =  new Date(unix).toUTCString()
  res.json({unix, utc})
})

app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  // if(!isNaN(date)) res.json({unix: })

  // console.log("logdate", date, "utc", utc);
  const unixDate = Date.parse(date);
  const utc = new Date(unixDate).toUTCString();

  if(!date){
    res.json({unix:  Date.now(), utc:  Date.now()})
  }


  if (isNaN(unixDate)) {
    // console.log(typeof date, date, Date());
    
    res.json({ error: "Invalid Date" })
  } else {
    res.json({ unix: unixDate, utc })
  }
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

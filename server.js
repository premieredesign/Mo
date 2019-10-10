// server.js
const express = require('express');
const app = express();
const request = require('request');
const http = require('http');

app.use(express.static(__dirname + '/dist/mo/'));

const getData = (url) => {
  const options = {
    url: url
  };

  return new Promise((resolve, reject) => {
    request.get(options, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(body)
      }
    })
  })
};

const errHandler = (err) => {
  console.log(err);
};

// Send Home Data
app.get('api/home/data', function(req, res) {
  const url = 'https://s3.us-east-2.amazonaws.com/mostuff/mo.json';
  getData(url).then(JSON.parse, errHandler)
    .then((results) => {
      res.json(results);
    });
});

// Send Mopreps Data
app.get('api/moriah/data', function(req, res) {
  const url = 'https://s3.us-east-2.amazonaws.com/mostuff/MoriahAPI.json';
  getData(url).then(JSON.parse, errHandler)
    .then((results) => {
      res.json(results);
    });
});

//Keep Heroku Awake
setInterval(() => {
  http.get('/', (req, res, next) => {
    console.log("Hi, Heroku is awake and serving your website", res);
    let err = new Error("Something went wrong with the request, please see the logs for more info");
    err.status = 403;
  });
}, 300000);



const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`See the Moriah Website on ${port}`);
});


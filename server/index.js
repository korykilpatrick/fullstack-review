const express = require('express');
const github = require('../helpers/github'); //getReposByUsername
const bodyParser = require('body-parser');
const db = require('../database/index'); // save
let app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  console.log('REQ BODY ---', req.body)
  // This route should take the github username provided
  let username = req.body.term;
  // and get the repo information from the github API, then
  github.getReposByUsername(username, (repoList) => {
  // save the repo information in the database
  	console.log('RESULTS FROM CALLING GRBUSERNAME', repoList);
  	db.save(repoList);
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


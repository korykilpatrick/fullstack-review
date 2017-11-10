const express = require('express');
const github = require('../helpers/github'); 
const bodyParser = require('body-parser');
const db = require('../database/index'); 
const Promise = require('bluebird');

let app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let username = req.body.term;
  db.isInDB(username)
    .then(bool => { if (bool) throw new Error(422)
      return github.getReposByUsername(username) })
    .then(repoList => { if (!repoList.length) throw new Error(404)
      return db.save(JSON.parse(repoList))})
    .then(() => res.sendStatus(201))
    .catch(err => res.sendStatus(err.message))
});

app.get('/repos', function (req, res) {
  db.getRepoCount()
    .then(count => {
      db.getTop25Repos()
      .then(repos => res.json({repos: repos, count: count}))
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


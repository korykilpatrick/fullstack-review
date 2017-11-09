const express = require('express');
const github = require('../helpers/github'); 
const bodyParser = require('body-parser');
const db = require('../database/index'); 
const Promise = require('bluebird');

let app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  let username = req.body.term;
  // and get the repo information from the github API, then
  db.isInDB(username, (err, repos) => {
  	if (err) {
  		console.error('Error searching for ', username, 'in the database: ', err)
  	}
  	if (repos.length) {
			res.status(201).send(username + ' is already in our database!')
		} else {
		  github.getReposByUsername(username, (repoList) => {
		  // save the repo information in the database
		  	db.save(JSON.parse(repoList))
          .then(() => {
            res.sendStatus(201);
		  	});
		  });
		}
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  let count = 0;
  db.getRepoCount((err, repos) => {
  	count = repos.length;
	  db.getTop25Repos((err, repos) => {
	  	res.json({repos: repos, count: count});
	  });
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


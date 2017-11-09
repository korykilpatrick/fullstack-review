const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: "https://api.github.com/users/" + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  // Use the request module to request repos for a specific
  // user from the github API
  request.get(options, (err, res, data) => {
    if (err) {
      console.log('ERROR: ', err);
    }
    console.log('USER DATA-->', data);
    callback(data);
  });
}


module.exports.getReposByUsername = getReposByUsername;
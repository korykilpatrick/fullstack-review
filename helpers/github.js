const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: "https://api.github.com/users/" + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  return new Promise((resolve, reject) => {
    request.get(options, (err, res, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
}


module.exports.getReposByUsername = getReposByUsername;
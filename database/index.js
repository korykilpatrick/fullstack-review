const mongoose = require('mongoose');
const forEP = require('foreach-promise');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  username: String,
  repoName: String,
  repoId: Number,
  ownerUrl: String,
  repoUrl: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoList) => {
  if (repoList.length) {
    let saveRepos = [];
    repoList.forEach(repo => {
      let newRepo = new Repo({
        username: repo.owner.login,
        repoName: repo.name,
        repoId: repo.id,
        ownerUrl: repo.owner.html_url,
        repoUrl: repo.html_url,
        forks: repo.forks_count
      });
      saveRepos.push(newRepo.save());
    })
    return Promise.all(saveRepos)
  }
}

let isInDB = (username, callback) => {
  Repo.
    find({username: username.toLowerCase()})
    .exec(callback)
}

let getRepoCount = (callback) => {
  Repo. 
    find().
    exec(callback);
}

let getTop25Repos = (callback) => {
  Repo.
    find().
    sort({forks: -1}).
    limit(25).
    exec(callback);
}

module.exports.save = save;
module.exports.getTop25Repos = getTop25Repos;
module.exports.isInDB = isInDB;
module.exports.getRepoCount = getRepoCount;
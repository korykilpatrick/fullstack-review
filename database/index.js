const mongoose = require('mongoose');
const forEP = require('foreach-promise');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  username: String,
  repoName: String,
  repoId: Number,
  ownerUrl: String,
  repoUrl: String,
  avatarUrl: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoList) => {
  return Promise.all(repoList.map(repo => {
    let newRepo = new Repo({
      username: repo.owner.login,
      repoName: repo.name,
      repoId: repo.id,
      ownerUrl: repo.owner.html_url,
      repoUrl: repo.html_url,
      avatarUrl: repo.owner.avatar_url,
      forks: repo.forks_count
    });
    return newRepo.save();
  }))
}

let isInDB = (username) => (
  Repo.
    find({username: username.toLowerCase()})
    .then(res => res.length > 0)
)

let getRepoCount = () => (
  Repo. 
    find()
    .then(res => res.length)
)

let getTop25Repos = () => (
  Repo.
    find().
    sort({forks: -1}).
    limit(25)
)

module.exports.save = save;
module.exports.getTop25Repos = getTop25Repos;
module.exports.isInDB = isInDB;
module.exports.getRepoCount = getRepoCount;
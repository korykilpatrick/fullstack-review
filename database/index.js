const mongoose = require('mongoose');
const forEP = require('foreach-promise');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  username: String,
  repoName: String,
  repoId: Number,
  url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoList) => {
  // This function should save a repo or repos to
  // the MongoDB
  // repoList is the github API data we get upon request
  if (repoList.length) {
    forEP(repoList, repo => {
      let newRepo = new Repo({
        username: repo.owner.login,
        repoName: repo.name,
        repoId: repo.id,
        url: repo.owner.url,
        forks: repo.forks_count
      });
      newRepo.save((err, newRepo) => {
        if (err) { return console.error('ERROR WHEN SAVING A NEWREPO: ', err) }
      });
    })
  }
  // .then(info => {
  //   console.log('THIS IS THE RESOLVED FOREP INFO', info);
  // })

}

let getTop25Repos = (callback) => {
  Repo.
    find({}).
    sort({forks: -1}).
    limit(25).
    exec(callback);
}

module.exports.save = save;
module.exports.getTop25Repos = getTop25Repos;
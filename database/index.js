const mongoose = require('mongoose');
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
  console.log('THIS IS THE REPOLIST THAT WE ARE ATTMEPTING TO SAVE', repoList);
  repoList.forEach(repo => {
    console.log('this is the repo', repo)
    let newRepo = new Repo({
      username: repo.owner.login,
      repoName: repo.name,
      repoId: repo.id,
      forks: repo.forks_count
    });
    newRepo.save((err, newRepo) => {
      if (err) { console.log('ERROR WHEN SAVING A NEWREPO: ', err) }
    });
  })
}

module.exports.save = save;
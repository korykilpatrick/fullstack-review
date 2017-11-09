import React from 'react';

const RepoListEntry = (props) => (
  <div>
  	<div><a href={props.repo.ownerUrl}>{props.repo.username} </a> 
  	 had <a href={props.repo.repoUrl}>{props.repo.repoName} </a> 
  	 forked {props.repo.forks} times!</div>
  </div>
)

export default RepoListEntry;
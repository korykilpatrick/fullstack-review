import React from 'react';

const RepoListEntry = (props) => (
  <div>
  	<div>
  		<a href={props.repo.repoUrl}>
  			<img style={{width: 50, paddingRight: 10}}src={props.repo.avatarUrl}/> 
  		</a>
  		<a href={props.repo.ownerUrl}>
  			{props.repo.username}
  		</a> 
  	 	{'  '} had {'  '}
  	 	<a href={props.repo.repoUrl}>
  	 	{props.repo.repoName} 
  	 	</a> 
  	 	{'  '} forked {props.repo.forks} times. Or whatever.
  	</div>
  </div>
)

export default RepoListEntry;
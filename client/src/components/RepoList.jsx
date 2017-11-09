import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <p>There are {props.repos.length} repos.</p>
    <ul>
    	{props.repos.forEach(repo => 
    		<li>props.repos.repoName</li>
    	)}
    </ul>
  </div>
)

export default RepoList;
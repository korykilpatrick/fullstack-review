import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List </h4>
    {function() {
    	if (props.count === 0) {
    		return <p>Stop reading this and add some fucking repos. Or whatever.</p>
    	} else if (props.count < 25) {
    		return <p>Heres out who got forked the hardest in our database. Or whatever.</p>
    	} else {
    		return <p>Of the {props.count} repos in our database, or whatever, here are the 25 most forked. Or whatever.</p>
    	}
    }()}
    <ul> 
    	{props.repos.map(repo => 
    		<RepoListEntry repo={repo} key={repo.repoUrl}/> 
    	)}
    </ul>
  </div>
)

export default RepoList;
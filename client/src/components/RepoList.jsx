import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    {function() {
    	if (props.count === 0) {
    		return <p>Our database is empty</p>
    	} else if (props.count < 25) {
    		return <p>Heres out who got forked the hardest in our database</p>
    	} else {
    		return <p>Of the {props.count} repos in our database, here are the 25 most forked!</p>
    	}
    }()}
    <ul> 
    	{props.repos.map(repo => 
    		<RepoListEntry repo={repo}/> 
    	)}
    </ul>
  </div>
)

export default RepoList;
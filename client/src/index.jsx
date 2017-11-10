import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      count: 0
    }
  }

  componentDidMount () {
    this.getRepos();
  }

  getRepos () {
     $.ajax({
      method: 'GET',
      url: '/repos',
    })
    .done(res => {
      this.setState({
        repos: res.repos,
        count: res.count
      });
    });
  }

  search (term) {
    $.ajax({
      method: 'POST',
      url: '/repos',
      contentType: 'application/json',
      data: JSON.stringify({term})
    })
    .done(res => {
      this.getRepos();
    })
    .fail(err => {
      console.log('Error: ', err);
    })
    console.log(`${term} was searched`);
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos} count={this.state.count} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
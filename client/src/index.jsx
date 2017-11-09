import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount () {
    $.ajax({
      method: 'GET',
      url: '/repos',
      contentType: 'application/json'
    })
    .done(res => {
      console.log('RESULTS BABY', Array.isArray(JSON.parse(res)))
      this.setState({
        repos: JSON.parse(res)
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
      // console.log('Results', res);
    })
    .fail(err => {
      console.log('Error: ', err);
    })
    console.log(`${term} was searched`);
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
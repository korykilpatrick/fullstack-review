import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>
      <h4>Add more repos. Or whatever.</h4>
      Enter a github username. Or whatever: <input value={this.state.term} onChange={this.onChange.bind(this)}/>     
      <button onClick={this.search.bind(this)}> Add Repos. Or whatever.</button> 
    </div>) 
  }
}

export default Search;
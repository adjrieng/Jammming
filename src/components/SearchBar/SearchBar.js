import React from 'react';
import './SearchBar.css';



class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value })
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  //Adds the enter key functionality in the SearcBar field
  handleEnterKey(event) {
    if(event.key === 'Enter') {
      //console.log('you pressed the enter key!')
      this.search();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist"
               onChange={this.handleTermChange}
               onKeyPress={this.handleEnterKey}/>
        <button className="SearchButton" onClick={this.search}>SEARCH</button>
      </div>
    );
  }
}

export default SearchBar;

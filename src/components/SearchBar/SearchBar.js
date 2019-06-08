import React from 'react';
import './SearchBar.css';



class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };

    this.search.bind(this);
    this.handleTermChage.bind(this);
  }

  handleTermChage(event) {
    this.setState({ term: event.target.value })
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist"
               onChange={this.handleTermChage}
               />
        <button className="SearchButton">SEARCH</button>
      </div>
    );
  }
}

export default SearchBar;

import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          id: 1,
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Tickle Me Not'
        },
        {
          id: 2,
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Tickle Me Not'
        },
        {
          id: 3,
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Tickle Me Not'
        },
      ],
      playlistName: 'My New Playlist',
      playlistTracks: [
        {
          id: 1,
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Tickle Me Not'
        },
        {
          id: 2,
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Tickle Me Not'
        },
        {
          id: 3,
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Tickle Me Not'
        },
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }


  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      // Create a new array based on current state:
      let playlistTracksArr = this.state.playlistTracks;
      // Push track to it
      playlistTracksArr.push(track);
      // Set state
      this.setState({ playlistTracks: playlistTracksArr });
    }
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      // Create a new array based on current state:
      let playlistTracksArr = this.state.playlistTracks;
      // Filter out track
      playlistTracksArr = playlistTracksArr.filter(myTrack => myTrack.id !== track.id);
      // Set state
      this.setState({ playlistTracks: playlistTracksArr });
    }
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);

  }

  search(term) {
    console.log(term);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}
                         onAdd={this.addTrack} />
          <Playlist playlistName={this.state.playlistName}
                    playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

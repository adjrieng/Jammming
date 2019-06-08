import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';


class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNmaeChange = this.handleNmaeChange.bind(this);
  }

  handleNmaeChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={this.props.playlistName} onChange={this.handleNmaeChange}/>
        <TrackList  tracks={this.props.playlistTracks}
                    isRemoval={true}
                    onRemove={this.props.onRemove}/>
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;

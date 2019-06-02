import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';


class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return (
      <div className="TrackList">
      {this.props.tracks.map(track => {
        return <Track
        track={track}
        name={this.props.track.name}
        artist={this.props.track.artist}
        album={this.props.track.album} />
      })}
      </div>
    );
  }
}

export default TrackList;

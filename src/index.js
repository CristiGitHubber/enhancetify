// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import spotifyApi from './SpotifyClient'; // Adjust the path as needed

// Example React component using Spotify API
class SpotifyApp extends React.Component {
  state = {
    searchQuery: '',
    searchResults: []
  };

  handleSearch = async () => {
    try {
      const response = await spotifyApi.searchTracks(this.state.searchQuery);
      this.setState({ searchResults: response.body.tracks.items });
    } catch (error) {
      console.error('Error searching tracks:', error);
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.searchQuery}
          onChange={(e) => this.setState({ searchQuery: e.target.value })}
        />
        <button onClick={this.handleSearch}>Search</button>

        <div>
          {this.state.searchResults.map(track => (
            <div key={track.id}>
              <p>{track.name} - {track.artists.map(artist => artist.name).join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<SpotifyApp />, document.getElementById('root'));

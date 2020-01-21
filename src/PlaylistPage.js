import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';
import './PlaylistPage.css';

class PlaylistPage extends Component {
  render() {
    return(
      <div id='background' className='container-fluid'>
        <div className='row h-100'>
          <div className='col-3' />
          <div className='col-6'>
            <span className='display-4 text-light'>A playlist, just for you...</span>
            <div className='mt-3'>
              <SpotifyPlayer
                uri={'https://open.spotify.com/playlist/37i9dQZF1DX1PfYnYcpw8w'}
                size={{width: '100%', height: '600px'}}
              />
            </div>
          </div>
          <div className='col-3' />
        </div>
      </div>
    );
  }
}

export default PlaylistPage;

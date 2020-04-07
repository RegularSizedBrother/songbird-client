import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';
import { Redirect } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

import './styles.css';

const defaultPlaylist = 'https://open.spotify.com/playlist/37i9dQZF1DX1PfYnYcpw8w';
const defaultGenres = ""

class PlaylistPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: defaultPlaylist,
      genres: defaultGenres,
      redirect: false,
      displaySpinner: true,
      error: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.callApi = this.callApi.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  };

  componentDidMount() {
    this.callApi();
  }

  callApi() {
    let id = this.props.match.params.id;
    fetch('http://localhost:5000/playlist/' + id)
      .then(res => res.json())
      .then(this.handleResponse,
        (error) => {
          this.setState({error: true});
        }
      );
  }

  handleResponse(res) {
    if(res.wait) {
      console.log('wait');
      setTimeout(this.callApi, 1000);
      return;
    }

    if(res.error) {
      this.setState({error: true});
    } else {
      this.setState({playlist: res.playlist, genres:res.genres, displaySpinner: false});
    }
  }

  handleClick() {
    this.setState({redirect: true});
  }

  render() {
    if(this.state.error) {
      return <Redirect to='/error' />;
    }

    if(this.state.redirect) {
      return <Redirect to='/' />
    }

    if(this.state.displaySpinner) {
      return(
        <div className='spinner-center'>
          <ScaleLoader color='#fff' className='spinner-center' />
        </div>
      );
    }

    return(
      <div id='background' className='container-fluid'>
        <div className='row h-100'>
          <div className='col-3' />
          <div className='col-6'>
            <span className='display-4 text-light'>A playlist, just for you...</span>
            <span className='display-4 text-light'> {this.state.genres} </span>
            <div className='mt-3'>
              <SpotifyPlayer
                uri={this.state.playlist}
                size={{width: '100%', height: '600px'}}
              />
            </div>
          </div>
          <div className='col-3' />
        </div>
        <div className='row mt-2 mb-2'>
          <div className='col-2'>
          </div>
          <div className='col-8'>
            <button className='btn btn-light btn-block btn-rounded' onClick={this.handleClick}>Run again...</button>
          </div>
          <div className='col-2'>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistPage;

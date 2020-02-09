import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';
import { Redirect } from 'react-router-dom';
import './styles.css';

const defaultPlaylist = 'https://open.spotify.com/playlist/37i9dQZF1DX1PfYnYcpw8w';

class PlaylistPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: defaultPlaylist,
      redirect: false
    };

    this.handleClick = this.handleClick.bind(this);
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    fetch('http://localhost:5000/playlist/' + id)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({playlist: result.playlist});
        },
        (error) => {
          console.log(error);
        });
  }

  handleClick() {
    this.setState({redirect: true});
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to='/' />
    }

    return(
      <div id='background' className='container-fluid'>
        <div className='row h-100'>
          <div className='col-3' />
          <div className='col-6'>
            <span className='display-4 text-light'>A playlist, just for you...</span>
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
            <button className='btn btn-dark btn-block btn-rounded' onClick={this.handleClick}>Run again...</button>
          </div>
          <div className='col-2'>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistPage;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import image from './error_image_white.png';
import './styles.css';

export default class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({redirect: true});
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to='/' />;
    }

    return(
      <div id='background' className='fixed container-fluid'>
        <div className='row h-75'>
          <div className='col-2' />
          <div className='col-8'>
            <div className='centered error-centered'>
              <span className="whiteText display-4">Something went wrong.</span>
              <img src={image} height={50} className="bird pl-2" />
            </div>
          </div>
          <div className='col-2' />
        </div>
        <div className='row mt-2 mb-2 h-25'>
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

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './TwitterPage.css';

class TwitterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twitterHandle: 'BarackObama',
      textInput: '',
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({textInput: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({redirect: true});
    console.log('Submitted');
  }

  redirect() {
    if(this.state.redirect) {
      return(<Redirect to={'/results/' + this.state.twitterHandle} />);
    }
    else {
      return('');
    }
  }

  render() {
    return(
      <div id='background' className='container-fluid'>
        <div className='row h-100'>
          <div className='col-3' />
          <div className='col-6'>
            <div className='centered'>
              <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                  <div className='input-group'>
                    <div className="input-group-prepend">
                      <span className="input-group-text">@</span>
                    </div>
                    <input className='form-control' placeholder={this.state.twitterHandle} value={this.state.value} onChange={this.handleChange} />
                  </div>
                  <label className='text-light ml-5 mt-1'>Enter your twitter handle...</label>
                </div>
              </form>
            </div>
          </div>
          <div className='col-3' />
        </div>
        {this.redirect()}
      </div>
    );
  }
}

export default TwitterPage;

import React, { Component } from 'react';
import './TwitterPage.css';

class TwitterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twitterHandle: 'BarackObama',
      textInput: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({textInput: e.target.value});
  }

  handleSubmit(e) {
    console.log('Submitted');
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
      </div>
    );
  }
}

export default TwitterPage;

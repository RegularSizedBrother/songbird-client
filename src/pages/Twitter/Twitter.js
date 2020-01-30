import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './styles.css';

const exampleHandles = [
  'BarackObama',
  'realDonaldTrump',
  'elonmusk',
  'rihanna',
  'cnnbrk',
  'SportsCenter',
  'NASA',
  'EmmaWatson'
];

class TwitterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleIndex: 0,
      textInput: '',
      redirect: false,
      changing: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  componentDidMount() {
    let intervalId = setInterval(this.changeName, 3000);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  changeName() {
    console.log(this.state);
    let newIndex = (this.state.handleIndex + 1) % exampleHandles.length;
    this.setState({handleIndex: newIndex});
    this.setState({changing: true});
  }

  handleChange(e) {
    this.setState({textInput: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:5000/twitter', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        handle: this.state.textInput
      })
    })
    .then(res => res.json())
    .then((response) => {
      console.log(response);
      this.setState({handle_id: response.handle_id});
      this.setState({redirect: true});
    });
    console.log('Submitted');
  }

  redirect() {
    console.log(this.state);
    if(this.state.redirect) {
      return(<Redirect to={'/attributes/' + this.state.handle_id} />);
    }
    else {
      return('');
    }
  }

  render() {
    let inputClass = this.state.changing ? 'form-control' : 'form-control'
    return(
      <div id='background' className='fixed container-fluid'>
        <div className='row h-100'>
          <div className='col-3' />
          <div className='col-6'>
            <div className='centered'>
              <h1 className="whiteText display-1 float-right">songbird.</h1>
              <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                  <div className='input-group test'>
                      <input type='text' className={inputClass} placeholder={exampleHandles[this.state.handleIndex]} value={this.state.value} onChange={this.handleChange} />
                      <i>@</i>
                  </div>
                  <label className='text-light ml-4 mt-1'>Enter your twitter handle...</label>
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

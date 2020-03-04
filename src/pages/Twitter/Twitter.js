import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { TextInput } from '../../components/TextInput';
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
    this.intervalId = setInterval(this.changeName, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  changeName() {
    let newIndex = (this.state.handleIndex + 1) % exampleHandles.length;
    this.setState({handleIndex: newIndex, changing: true});
  }

  handleChange(e) {
    this.setState({textInput: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:5000/twitter', {
      method: 'POST',
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
      this.setState({handle_id: response.handle_id, redirect: true});
    })
    .catch((response) => {
      console.log(response);
    });
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to={'/attributes/' + this.state.handle_id} />
    }

    return(
      <div id='background' className='fixed container-fluid'>
        <div className='row h-100'>
          <div className='col-3' />
          <div className='col-6'>
            <div className='centered'>
              <h1 className="whiteText display-1 float-right">songbird.</h1>
              <TextInput
                placeholder={exampleHandles[this.state.handleIndex]}
                value={this.state.textInput}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
              />
            </div>
          </div>
          <div className='col-3' />
        </div>
      </div>
    );
  }
}

export default TwitterPage;

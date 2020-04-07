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

const exampleUsernames = [
  'trollabot',
  'user_simulator',
  'spez',
  'wil',
  'here_comes_the_king',
  'boardgamerecommender',
  'PresidentObama',
  'ColChrisHadfield'
];

class TwitterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleIndex: 0,
      textInput: '',
      redirect: false,
      changing: false,
      twitterToggled: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeName = this.changeName.bind(this);
    this.handleTwitterPress = this.handleTwitterPress.bind(this);
    this.handleRedditPress = this.handleRedditPress.bind(this);
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

    let source = this.state.twitterToggled ? "twitter" : "reddit"
    console.log(source)

    fetch('http://localhost:5000/twitter', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        handle: this.state.textInput,
        source: source
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

  handleTwitterPress() {
    this.setState({twitterToggled: true});
  }

  handleRedditPress() {
    this.setState({twitterToggled: false});
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to={'/attributes/' + this.state.handle_id} />
    }

    let label, twitterClass, redditClass, prefix, placeholder;
    if(this.state.twitterToggled) {
      label = "Enter your Twitter handle...";
      twitterClass = "btn btn-light active";
      redditClass = "btn btn-light";
      prefix = "@";
      placeholder = exampleHandles[this.state.handleIndex];
    } else {
      label = "Enter your Reddit username...";
      twitterClass = "btn btn-light";
      redditClass = "btn btn-light active";
      prefix = "u/";
      placeholder = exampleUsernames[this.state.handleIndex];
    }

    return(
      <div id='background' className='fixed container-fluid'>
        <div className='row h-100'>
          <div className='col-3' />
          <div className='col-6'>
            <div className='centered'>
              <h1 className="whiteText display-1 float-right">songbird.</h1>
              <TextInput
                placeholder={placeholder}
                value={this.state.textInput}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                label={label}
                prefix={prefix}
              />

              <div className="btn-group btn-group-toggle d-flex" dataToggle="buttons">
                <label className={twitterClass}>
                  <input type="radio" name="source" id="source1" autocomplete="off" checked onClick={this.handleTwitterPress} /> Twitter
                </label>
                <label className={redditClass}>
                  <input type="radio" name="source" id="source1" autocomplete="off" onClick={this.handleRedditPress} /> Reddit
                </label>
              </div>
              <div className='col-3'></div>
              <div className='row mt-2 mb-2'>
                <div className='col-2'>
                </div>
                <div className='col-8'>
                  <button className='btn btn-light btn-block btn-rounded' onClick={this.handleSubmit}>Click here or press Enter to continue...</button>
                </div>
                <div className='col-2'>
                </div>
              </div>
            </div>
          </div>
          <div className='col-3' />
        </div>
      </div>
    );
  }
}

export default TwitterPage;

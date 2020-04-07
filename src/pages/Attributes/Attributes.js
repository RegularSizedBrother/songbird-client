import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

import { BarGraph } from '../../components/BarGraph';
import { RadarGraph } from '../../components/RadarGraph';
import { TextTicker } from '../../components/TextTicker';
import './styles.css';

const defaultAttributes = [
  { label: 'Curious', opposite: 'Cautious', value: 40-50 },
  { label: 'Organized', opposite: 'Careless', value: 30-50 },
  { label: 'Outgoing', opposite: 'Reserved', value: 20-50 },
  { label: 'Friendly', opposite: 'Challenging', value: 60-50 },
  { label: 'Nervous', opposite: 'Confident', value: 34-50 },
];

const defaultSpinnerFacts = [
  'Gathering data...',
  'Processing data...',
  'Analyzing data...'
];

class AttributesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      displaySpinner: true,
      attributeData1: defaultAttributes,
      attributeData2: defaultAttributes,
      error: false,
      finished: false,
      fact: 0,
      mbti: 'INTJ'
    };

    this.handleClick = this.handleClick.bind(this);
    this.callApi = this.callApi.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.changeFact = this.changeFact.bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(this.changeFact, 5000);
    this.callApi();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  changeFact() {
    let nextFact = (this.state.fact + 1) % defaultSpinnerFacts.length;
    this.setState({fact: nextFact});
  }

  callApi() {
    let id = this.props.match.params.id;
    fetch('http://localhost:5000/attributes/' + id)
      .then(res => res.json())
      .then(this.handleResponse,
        (error) => {
          this.setState({error: true});
        });
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
      let data1 = [
        { label: 'Curious', opposite: 'Cautious', value: res.data['Openness'] - 50  },
        { label: 'Organized', opposite: 'Careless', value: res.data['Conscientiousness'] - 50 },
        { label: 'Outgoing', opposite: 'Reserved', value: res.data['Extraversion'] - 50 },
        { label: 'Friendly', opposite: 'Challenging', value: res.data['Agreeableness'] - 50 },
        { label: 'Nervous', opposite: 'Confident', value: res.data['Emotional Range'] - 50 },
      ];
      this.setState({attributeData1: data1, displaySpinner: false});
      let data2 = [
        { label: 'Curious', opposite: 'Cautious', value: res.data['Openness']  },
        { label: 'Organized', opposite: 'Careless', value: res.data['Conscientiousness'] },
        { label: 'Outgoing', opposite: 'Reserved', value: res.data['Extraversion'] },
        { label: 'Friendly', opposite: 'Challenging', value: res.data['Agreeableness'] },
        { label: 'Nervous', opposite: 'Confident', value: res.data['Emotional Range'] },
      ];
      this.setState({attributeData2: data2});
      let curr_mbti = res.data['MBTI'];
      this.setState({mbti: curr_mbti})
      if(!res.finished) {
        setTimeout(this.callApi, 1000);
      } else {
        this.setState({finished: true});
      }
    }
  }

  handleClick(e) {
    this.setState({redirect: true});
  }

  render() {
    if(this.state.error) {
      return <Redirect to='/error' />;
    }

    if(this.state.redirect) {
      let id = this.props.match.params.id;
      return <Redirect to={'/playlist/' + id} />
    }

    if(this.state.displaySpinner) {
      let text = defaultSpinnerFacts[this.state.fact];
      return(
        <div className='spinner-page'>
          <div className='spacer'></div>
          <TextTicker fact={text}/>
          <div className='spinner-center-text'>
            <ScaleLoader color='#fff' />
          </div>
        </div>
      );
    }

    return(
      <div id='background' className='container-fluid'>
        <div className='row mt-2'>
          <div className='col-3'>
            <div className='profile'>
              <p>Your MBTI profile: {this.state.mbti}</p>
            </div>
          </div>
          <div className='col-6 white'>
            <BarGraph data={this.state.attributeData1} />
          </div>
          <div className='col-3'>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-3'>
          </div>
          <div className='col-6 white'>
            <RadarGraph data ={this.state.attributeData2} />
          </div>
          <div className='col-3'>
          </div>
        </div>
        <div className='row mt-2 mb-2'>
          <div className='col-2'>
          </div>
          <div className='col-8'>
            <button className='btn btn-light btn-block btn-rounded' onClick={this.handleClick} disabled={!this.state.finished}>See my playlist...</button>
          </div>
          <div className='col-2'>
          </div>
        </div>
      </div>
    );
  }
}

export default AttributesPage;


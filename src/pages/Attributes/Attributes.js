import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

import { BarGraph } from '../../components/BarGraph';
import './styles.css';

const defaultAttributes = [
  { label: 'Curious', opposite: 'Cautious', value: 40-50 },
  { label: 'Organized', opposite: 'Careless', value: 30-50 },
  { label: 'Outgoing', opposite: 'Reserved', value: 20-50 },
  { label: 'Friendly', opposite: 'Challenging', value: 60-50 },
  { label: 'Nervous', opposite: 'Confident', value: 34-50 },
];

class AttributesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      displaySpinner: true,
      attributeData: defaultAttributes,
      error: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.callApi = this.callApi.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  componentDidMount() {
    this.callApi();
  }

  callApi() {
    let id = this.props.match.params.id;
    fetch('http://localhost:5000/bob/attributes/' + id)
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
      let data = [
        { label: 'Curious', opposite: 'Cautious', value: res.data['Openness'] - 50  },
        { label: 'Organized', opposite: 'Careless', value: res.data['Conscientiousness'] - 50 },
        { label: 'Outgoing', opposite: 'Reserved', value: res.data['Extraversion'] - 50 },
        { label: 'Friendly', opposite: 'Challenging', value: res.data['Agreeableness'] - 50 },
        { label: 'Nervous', opposite: 'Confident', value: res.data['Emotional Range'] - 50 },
      ];
      this.setState({attributeData: data, displaySpinner: false});
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
      return(
        <div className='spinner-center'>
          <ScaleLoader color='#fff' />
        </div>
      );
    }

    return(
      <div id='background' className='container-fluid'>
        <div className='row mt-2'>
          <div className='col-3'>
          </div>
          <div className='col-6 white'>
            <BarGraph data={this.state.attributeData} />
          </div>
          <div className='col-3'>
          </div>
        </div>
        <div className='row mt-2 mb-2'>
          <div className='col-2'>
          </div>
          <div className='col-8'>
            <button className='btn btn-light btn-block btn-rounded' onClick={this.handleClick}>See my playlist...</button>
          </div>
          <div className='col-2'>
          </div>
        </div>
      </div>
    );
  }
}

export default AttributesPage;


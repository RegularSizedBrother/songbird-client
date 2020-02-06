import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { BarGraph } from '../../components/BarGraph';
import './styles.css';

const defaultAttributes = [
  { label: 'Openness', opposite: 'Shyness', value: 40-50 },
  { label: 'Conscientious', opposite: 'Something', value: 30-50 },
  { label: 'Extrovert', opposite: 'Introvert', value: 20-50 },
  { label: 'Agreeable', opposite: 'Disagreeable', value: 60-50 },
  { label: 'Empathy', opposite: 'Something', value: 34-50 },
];

class AttributesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      attributeData: defaultAttributes
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    fetch('http://localhost:5000/attributes/' + id)
      .then(res => res.json())
      .then(
        (result) => {
          let data = [
            { label: 'Openness', opposite: 'Closedness', value: result['Openness'] - 50 },
            { label: 'Conscientious', opposite: 'Something', value: result['Conscientiousness'] - 50 },
            { label: 'Extrovert', opposite: 'Introvert', value: result['Extraversion'] - 50 },
            { label: 'Agreeable', opposite: 'Disagreeable', value: result['Agreeableness'] - 50 },
            { label: 'Empathy', opposite: 'Something', value: result['Emotional Range'] - 50 },
          ];
          this.setState({attributeData: data});
        },
        (error) => {
          console.log(error);
        });
  }

  handleClick(e) {
    this.setState({redirect: true});
  }

  render() {
    let id = this.props.match.params.id;
    if(this.state.redirect) {
      return <Redirect to={'/playlist/' + id} />
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
            <button className='btn btn-dark btn-block btn-rounded' onClick={this.handleClick}>See my playlist...</button>
          </div>
          <div className='col-2'>
          </div>
        </div>
      </div>
    );
  }
}

export default AttributesPage;


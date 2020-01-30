import React, { Component } from 'react';
import {
  BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Redirect } from 'react-router-dom';
import './styles.css';

const data = [
  { name: 'Openness', val: 40 },
  { name: 'Conscientious', val: 30 },
  { name: 'Extrovert', val: 20 },
  { name: 'Agreeable', val: 60 },
  { name: 'Empathy', val: 34 },
];

class AttributesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      attributeData: data
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    console.log(id);
    fetch('http://localhost:5000/attributes/' + id)
      .then(res => res.json())
      .then(
        (result) => {
          let data = [
            { name: 'Openness', val: result['Openness'] },
            { name: 'Conscientious', val: result['Conscientiousness'] },
            { name: 'Extrovert', val: result['Extraversion'] },
            { name: 'Agreeable', val: result['Agreeableness'] },
            { name: 'Empathy', val: result['Emotional Range'] },
          ];
          console.log(result);
          this.setState({attributeData: data});
        },
        (error) => {
          console.log('error');
        });
  }

  handleClick(e) {
    this.setState({redirect: true});
  }

  redirect() {
    let id = this.props.match.params.id;
    if(this.state.redirect) {
      return(<Redirect to={'/playlist/' + id} />);
    }
    else {
      return('');
    }
  }

  render() {
    return(
      <div id='background' className='container-fluid'>
        <div className='row mt-2'>
          <div className='col-3'>
          </div>
          <div className='col-6 white'>
            <ResponsiveContainer width='100%' height={400}>
              <BarChart
                data={this.state.attributeData}
                margin={{
                  top: 40, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="val" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className='col-3'>
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-3'>
          </div>
          <div className='col-6 white'>
            <ResponsiveContainer width='100%' height={400}>
              <LineChart
                data={this.state.attributeData}
                margin={{
                  top: 40, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="val" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
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
        {this.redirect()}
      </div>
    );
  }
}

export default AttributesPage;


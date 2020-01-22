import React, { Component } from 'react';
import {
  BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Redirect } from 'react-router-dom';
import './ResultsPage.css';

const data = [
  { name: 'Openness', val: 40.7 },
  { name: 'Conscientious', val: 80.3 },
  { name: 'Extravert', val: 2.2 },
  { name: 'Agreeable', val: 67.8 },
  { name: 'Empathy', val: 34.9 },
];

const dataBar = [
  { name: 'Openness', val: 40.7 },
  { name: 'Conscientious', val: 80.3 },
  { name: 'Extravert', val: 2.2 },
  { name: 'Agreeable', val: 67.8 },
  { name: 'Empathy', val: 34.9 },
];

class ResultsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {redirect: false};

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let username = this.props.match.params.username;
    console.log(username);
    fetch('http:localhost:8080/username?username=' + username)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({usernameInfo: result});
        },
        (error) => {
          console.log('error');
        });
  }

  handleClick(e) {
    this.setState({redirect: true});
  }

  redirect() {
    let username = this.props.match.params.username;
    if(this.state.redirect) {
      return(<Redirect to={'/playlist/' + username} />);
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
            <BarChart
              width={600}
              height={400}
              data={dataBar}
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
          </div>
          <div className='col-3'>
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-3'>
          </div>
          <div className='col-6 white'>
            <LineChart
              width={600}
              height={400}
              data={data}
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
          </div>
          <div className='col-3'>
          </div>
        </div>
        <div className='row mt-2 mb-2'>
          <div className='col-2'>
          </div>
          <div className='col-8'>
            <button className='btn btn-dark btn-block btn-rounded' onClick={this.handleClick}>See my playlist</button>
          </div>
          <div className='col-2'>
          </div>
        </div>
        {this.redirect()}
      </div>
    );
  }
}

export default ResultsPage;


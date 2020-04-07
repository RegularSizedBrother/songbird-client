import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from 'recharts';
import './styles.css';

export default function RadarGraph(props) {
    return (
      <ResponsiveContainer width="100%" height={500}>
        <RadarChart cx={300} cy={250} outerRadius={200} width={500} height={500} data={props.data}>
          <PolarGrid stroke="#8884d8"/>
          <PolarAngleAxis dataKey="label" />
          <Radar name="User" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
}
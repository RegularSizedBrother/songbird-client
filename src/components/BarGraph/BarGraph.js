import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import './styles.css';

export default function BarGraph(props) {
  return(
    <ResponsiveContainer width='100%' height={500}>
      <BarChart
        data={props.data}
        margin={{
          top: 40, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis xAxisId='opposite' dataKey="opposite" orientation='bottom' />
        <XAxis xAxisId='label' dataKey="label" orientation='top' />
        <YAxis type='number' domain={[-50, 50]} />
        <Tooltip />
        <ReferenceLine xAxisId='label' y={0} stroke='#000' />
        <Bar xAxisId='label' dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

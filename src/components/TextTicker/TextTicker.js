import React from 'react';
import './styles.css';

function TextTicker(props) {
  return(
    <div id='text-display'>
      <p>{props.fact}</p>
    </div>
  );
}

export default TextTicker;
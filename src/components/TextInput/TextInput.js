import React from 'react';
import './styles.css';

function TextInput(props) {
  return(
    <form onSubmit={props.onSubmit}>
      <div className='form-group'>
        <div className='input-group test'>
            <input type='text' className='form-control' placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
            <i>{props.prefix}</i>
        </div>
        <label className='text-light ml-4 mt-1'>{props.label}</label>
      </div>
    </form>
  );
}

export default TextInput;

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import TextInput from './TextInput';

describe('TextInput', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      onSubmit: jest.fn(() => 'onSubmit'),
      onChange: jest.fn(() => 'onChange'),
      placeholder: 'BarackObama',
      value: '',
    };
    wrapper = shallow(<TextInput {...props} />);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<TextInput {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('calls onSubmit when the form is submitted', () => {
    const form = wrapper.find('form').first();
    form.simulate('submit');
    expect(props.onSubmit).toBeCalled();
  });

  it('calls onChange when the input changes value', () => {
    const input = wrapper.find('input').first();
    input.simulate('change', { target: { value: 'OSUPrezDrake' } });
    expect(props.onChange).toBeCalled();
  });
});

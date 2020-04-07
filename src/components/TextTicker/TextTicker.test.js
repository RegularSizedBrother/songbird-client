import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import TextTicker from './TextTicker';

describe('TextTicker', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      fact: 0
    };
    wrapper = shallow(<TextTicker {...props} />);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<TextTicker {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });
});

import React from 'react';
import renderer from 'react-test-renderer';

import BarGraph from './BarGraph';

describe('BarGraph', () => {
  let props;

  beforeEach(() => {
    props = {
      data: [
        { label: 'Openness', opposite: 'Shyness', value: 10 },
        { label: 'Extrovert', opposite: 'Introvert', value: -30 },
      ]
    };
  });

  it('renders correctly', () => {
    const tree = renderer.create(<BarGraph {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

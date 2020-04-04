import React from 'react';
import renderer from 'react-test-renderer';

import RadarGraph from './RadarGraph';

describe('RadarGraph', () => {
    let props;
  
    beforeEach(() => {
      props = {
        data: [
          { label: 'Openness', opposite: 'Shyness', value: 15 },
          { label: 'Extrovert', opposite: 'Introvert', value: 99 },
        ]
      };
    });
  
    it('renders correctly', () => {
      const tree = renderer.create(<RadarGraph {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
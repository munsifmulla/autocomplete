import React, { Component } from 'react';

import Intellicense from './Intellicense'


const items=[
  {
    name: 'item 1',
    value: 'item 1'
  },
  {
    name: 'Sound',
    value: 'Sound'
  },
  {
    name: 'Sound item',
    value: 'Sound item'
  }
]

class Auto extends Component {
  render() {
    return (
      <Intellicense items={items}/>
    );
  }
}

export default Auto;

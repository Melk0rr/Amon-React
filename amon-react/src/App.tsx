import React from 'react';
import './App.css';

import { between } from './utils/math'

const num = 5, min = 0, max = 10

const App = () => (
  <div className="App">
    <p>Test Typescript tuples:</p>
    <p>{num} is between {min} and {max} : {`${between(num, [min, max])}`}</p>
  </div>
)

export default App;

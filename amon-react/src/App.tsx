import React from 'react'
import './App.css'

import { between } from './utils/math'
import { sortMap } from './utils/array'


const num: number = 5,
  min: number = 0,
  max: number = 10

const ages = new Map<string, number>([
  ['roy', 3],
  ['rick', 35],
  ['rachael', 33],
  ['tetsuo', 17]
])
console.log(ages)

const sortedAges = sortMap(ages, (a: any, b: any) => a[1] - b[1])
console.log(sortedAges)

const App = () => (
  <div className="App">
    <p>Test Typescript tuples:</p>
    <p>{num} is between {min} and {max} : {`${between(num, [min, max])}`}</p>

  </div>
)

export default App

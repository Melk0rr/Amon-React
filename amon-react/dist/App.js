import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { between } from './utils/math';
import { sortMap } from './utils/array';
const num = 5, min = 0, max = 10;
const ages = new Map([
    ['roy', 3],
    ['rick', 35],
    ['rachael', 33],
    ['tetsuo', 17]
]);
console.log(ages);
const sortedAges = sortMap(ages, (a, b) => a[1] - b[1]);
console.log(sortedAges);
const App = () => (_jsxs("div", { className: "App", children: [_jsx("p", { children: "Test Typescript tuples:" }), _jsxs("p", { children: [num, " is between ", min, " and ", max, " : ", `${between(num, [min, max])}`] })] }));
export default App;

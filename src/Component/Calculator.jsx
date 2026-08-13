import React, { useState } from "react";

function Calculator() {
const [num1, setNum1] = useState("");
const [num2, setNum2] = useState("");
const [result, setResult] = useState("");
const [operator, setOperator] = useState("+");

const calculate = () => {
const a = Number(num1);
const b = Number(num2);

if (num1 === "" || num2 === "") {
setResult("Please enter both numbers");
return;
}

let answer;

switch (operator) {
case "+":
answer = a + b;
break;

case "-":
answer = a - b;
break;

case "*":
answer = a * b;
break;

case "/":
if (b === 0) {
setResult("Cannot divide by zero");
return;
}
answer = a / b;
break;

default:
answer = 0;
}

setResult(answer);
};

const clearCalculator = () => {
setNum1("");

setNum2("");
setResult("");
setOperator("+");
};

return (

<div className="min-h-screen bg-gray-100 flex items-center justify-center p-
6">

<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
<h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
Basic Calculator
</h1>

<input
type="number"
placeholder="Enter first number"
value={num1}
onChange={(e) => setNum1(e.target.value)}

className="mb-4 w-full rounded-lg border border-gray-300 p-3 outline-
none focus:border-blue-500"

/>

<select
value={operator}
onChange={(e) => setOperator(e.target.value)}

className="mb-4 w-full rounded-lg border border-gray-300 p-3 outline-
none"

>
<option value="+">Addition (+)</option>
<option value="-">Subtraction (-)</option>
<option value="*">Multiplication (×)</option>
<option value="/">Division (÷)</option>
</select>

<input
type="number"
placeholder="Enter second number"
value={num2}
onChange={(e) => setNum2(e.target.value)}

className="mb-6 w-full rounded-lg border border-gray-300 p-3 outline-
none focus:border-blue-500"

/>

<div className="flex gap-3">
<button
onClick={calculate}

className="flex-1 rounded-lg bg-blue-500 px-5 py-3 font-semibold text-
white transition hover:bg-blue-600"

>
Calculate
</button>

<button
onClick={clearCalculator}

className="flex-1 rounded-lg bg-gray-500 px-5 py-3 font-semibold text-
white transition hover:bg-gray-600"

>
Clear
</button>
</div>

{result !== "" && (
<div className="mt-6 rounded-lg bg-gray-100 p-4 text-center">
<p className="text-sm text-gray-500">Result</p>
<p className="mt-1 text-3xl font-bold text-blue-600">
{result}
</p>
</div>
)}
</div>
</div>
);
}

export default Calculator;
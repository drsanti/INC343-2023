/**
 * Functions
 */

// ex14.1 - no input parameters, no return
function f1() {
    console.log(`f1()`);
}
// call the function f1()
f1();


// ex14.2 - one input parameter, no return
function f2(val) {
    console.log(`f2() val=${val}`);
}
// call the function f2() with a parameter (10)
f2(10);


// ex14.3 - two input parameters, no return
function f3(a, b) {
    console.log(`f3() a+b=${a+b}`);
}
// call the function f3() with two parameters (2, 3)
f3(2, 3);


// ex14.4 - no input parameters, return a real number
function getPI() {
    return Math.PI;
}
// call the function getPI() and print the returned value.
console.log(getPI());


// ex14.5 - one input parameter, return a result
function Mul2(val) {
    return val * 2;
}
// call the function Mul2() and print the returned value.
console.log(Mul2(2));


// ex14.6 - two input parameter, return a result
function Add(x, y) {
    return x + y;
}
// call the function Add() and print the returned value.
console.log(Add(6, 4));


// ex14.7 - two input parameter, return an object as a result
function Calc(x, y) {
    return {add: (x+y), sub: (x-y)}
}
// call the function Calc() and print the returned object.
console.log(Calc(6, 4));


/**
 * Template literals (Template strings)
 */

let s1 = "The answer of"
let x = 5;
let y = 2;

/**
 * Without using the template literals, we must use `+` operators
 */
let s2 = s1 + " x + y is " + (x + y);
console.log(s2);


/**
 * With the template literals, the expressions are inserted in the ${}.
 */
let s3 = `${s1} x + y is ${x + y}`;
console.log(s3);

/**
 * Variable deceleration with:
 *  - const
 *  - let
 *  - var
 */

/**
 * const
 * The value of `const` variable cannot be changed
 */
const PI = 3.141592653589793;

// Try to change the value of the PI
// TypeError: Assignment to constant variable.
/* PI = 3.14; */



/**
 * let
 * `let` allows variable declaration only one time.
 */
let x = 10;
console.log(`x=${x}`);

// Try to redeclare the x variable agin
// SyntaxError: Identifier 'x' has already been declared.
/* let x = 2; */


/**
 * var
 * `var` allows allows variable declaration multiple times.
 */
var v = 2;
console.log(`v=${v}`);

// Try to redeclare the `v` variable agin and agin.
// No Error
var v = 4;
console.log(`v=${v}`);
var v = 10;
console.log(`v=${v}`);

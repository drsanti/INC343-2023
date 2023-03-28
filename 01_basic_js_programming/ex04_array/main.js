/**
 * Array
 */

// Empty array
let arr1 = [];
console.log(arr1);

// Array with initial values
let arr2 = [2, 5, 7];
console.log(arr2);

// Change/write value in array
arr2[0] = 9;
console.log(arr2);

// Read a value from array
console.log(arr2[0]);
console.log(arr2[2]);


// Push a new value/element to array
arr2.push(11);
console.log(arr2);

// Pop a value/element from array
console.log(arr2.pop());

// Length/number of element in array
console.log(arr2.length);

// Loop over array
console.log(`---`)
arr2.forEach(function(d) {
    console.log(d);
});

/**
 * Note:
 * There are many more functions/methods of the array.
 */
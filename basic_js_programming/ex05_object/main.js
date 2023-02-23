
/**
 * Object
 */

// Empty object
let obj1 = {};
console.log(obj1);

// Object with a pair of key-value
let obj2 = { x: 10 };
console.log(obj2);

// Object with multiple key-value pairs
let obj3 = { x: 10, y: true, z: "hello" };
console.log(obj3);

// Change value in the object.
obj3.y = false;
obj3['z'] = "hi"
console.log(obj3);

// Read value from object
let a = obj3['x'];
let b = obj3.y;
console.log(`a=${a}, b=${b}`);

// Add key-value pairs to the object
obj2.r = 22.5;
obj2['s'] = 'welcome';
console.log(obj1);

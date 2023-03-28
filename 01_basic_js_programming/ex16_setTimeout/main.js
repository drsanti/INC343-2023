/**
 * setTimeout
 */

// Using anonymous function
console.log(`Start 1`);
setTimeout(function (){
    console.log(`timeout 1`)
}, 3000);

// Using arrow function
console.log(`Start 2`);
setTimeout(()=>{
    console.log(`timeout 2`)
}, 5000);

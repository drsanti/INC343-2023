/**
 * Arrow Functions
 */
// ex15.1 - declare and call the arrow function (method 1)
const af1 = (x) => {x*2};
console.log(af1(4));

// ex15.2 - declare and call the arrow function (method 2)
const af2 = (x) => x*2;
console.log(af2(4));

// ex15.3 - declare and call the arrow function (method 3)
const af3 = x => x*2;
console.log(af3(4));


// ex15.4 no input, no return
const af4 = () => console.log(`af4()`)
af4();


// ex15.5 two inputs, no return
const af5 = (x, y) => console.log(`af5() x + y = ${x+y}`)
af5(5, 7);


// ex15.6 two inputs, with return
const af6 = (x, y) => x + y
console.log(af6(5, 7));


// ex15.7 two inputs, with return
const af7 = (s, e) => {
    let sum = 0;
    for(i=s; i<=e; i++) {
        sum += i;
    }
    return i;
}
console.log(af7(1, 4));




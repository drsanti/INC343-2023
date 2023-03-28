
/**
 * while loop
 */



// ex12.1
console.log(`ex12.1`);
let x = 5;
while(x >=0 )
{
    console.log(`x = ${x}`);
    x--;
}


// ex12.2 - break
console.log(`ex12.2`);
let y = 4;
while(true)
{
    console.log(`y = ${y}`);
    y--;
    if(y <= 0) {
        break;
    }
}

// ex12.3 - continue
console.log(`ex12.3`);
let z = 0;
while(z < 10)
{
    z++;
    if(z % 2 == 0) {
        continue;
    }
    console.log(`z = ${z}`);
}


// ex12.4 - infinite loop
// Press CTRL+C to terminate the loop
console.log(`ex12.4`);
let counter = 0;
while(true)
{
    counter++;
    console.log(`counter = ${counter}  - Press CTRL+C to stop`);
}

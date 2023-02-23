
/**
 * for loop
 */

// ex11.1 - increment i by 1
console.log(`ex11.1`);
for(let i=0; i<5; i++) {
    console.log(`i=${i}`);
}

// ex11.2 decrement i by i
console.log(`ex11.2`);
for(let i=7; i>2; i--) {
    console.log(`i=${i}`);
}

// ex11.3 - increment i by 2
console.log(`ex11.3`);
for(let i=7; i<=12; i+=2) {
    console.log(`i=${i}`);
}


// ex11.4 - break
console.log(`ex11.4`);
let sum = 0.0;
for(let i=0; i<50; i++) {
    sum += i;
    console.log(`sum=${sum}`);
    if(sum >= 10) {
        break;
    }
}

// ex11.5 - continue
console.log(`ex11.5`);
let sum_even = 0.0;
for(let i=0; i<6; i++) {
    if( i%2 ==0 ) {
        continue;
    }
    sum_even += i;
    console.log(`sum_even=${sum_even}`);
}
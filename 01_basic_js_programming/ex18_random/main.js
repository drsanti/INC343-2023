/**
 * random
 */

/**
 * Note:
 * Press CTRL+C to terminate the program.
 */

// Generate random real number ever 0.5 seconds.
setInterval(()=>{
    let r = Math.random();
    console.log(`random value: ${r.toFixed(3)}`);
}, 500);

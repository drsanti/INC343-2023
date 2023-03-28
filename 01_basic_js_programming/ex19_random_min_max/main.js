/**
 * random in range (min, max)
 */

/**
 * Note:
 * Press CTRL+C to terminate the program.
 */


/**
 * Generates and returns a random real number in the range of `min` and `max`.
 */
function randomMinMax(min, max) {
    let r01 = Math.random();
    let sp = max-min;
    let ans = min + r01*sp;
    return ans;
}

// Generate random real number ever 0.5 seconds.
setInterval(()=>{
    let rmm = randomMinMax(1,5);
    console.log(`random value: ${rmm.toFixed(3)}`);
}, 500);

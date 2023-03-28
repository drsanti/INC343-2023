
/**
 * Data generation
 */

/**
 * Generates and returns a random real number in the range of `min` and `max`.
 */
function randomMinMax(min, max) {
    return min + (max-min)*Math.random();
}

/**
 * Generates and returns an array of random real numbers.
 * The possible value of each random number is specified by the `min` and `max`.
 * The number of samples/items is specified by the `numItems`.
 */
function generateData(min, max, numItems) {
    let data = [];
    for(let i=0; i<numItems; i++) {
        data[i] = randomMinMax(min, max); 
    }
    return data;
}


/**
 * Generate sensor data
 */
const MIN = 4.0
const MAX = 20.0;
const SAMPLES = 10;

let sensorData = generateData(MIN, MAX, SAMPLES);


// Print the generated data
sensorData.forEach((v, i) => {
    console.log(`data[${i}] = ${v.toFixed(3)}`);
});

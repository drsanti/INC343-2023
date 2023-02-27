
/**
 * Import the `serialport` package
 */
import { SerialPort } from 'serialport'


/**
 * Define a target path (port name)
 */
/** For Windows, uncomment and modify a line below */
// const PATH = `COMxx`;

/** For Mac, uncomment and modify a line below */
// const PATH = `/dev/tty.xxx`;


/**
 * Create a port
 */
const port = new SerialPort({
	path: PATH,
	baudRate: 115200, /** 115200 is the baud rate of the MCU */
});

/**
 * Print the details of the port object.
 */
console.log(port);

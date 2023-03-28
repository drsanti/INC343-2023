
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
const PATH = `/dev/tty.usbserial-140`;


/**
 * Create a port
 */
const port = new SerialPort({
	path: PATH,
	baudRate: 115200, /** 115200 is the baud rate of the MCU */
});

/**
 * The open event.
 * This event is always emitted when the port is opened.
 */
port.on('open', () => {

	/**
	 * Print the details of the port object.
	 */
	console.log(port);

	/**
	 * Print the information
	 */
	console.log(`The ${PATH} Ready!`);
});




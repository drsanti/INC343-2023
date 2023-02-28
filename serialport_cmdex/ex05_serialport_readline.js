
import { SerialPort } from 'serialport';
/**
 * Import the `parser-readline` package
 */
import { ReadlineParser } from '@serialport/parser-readline'

const PATH = `/dev/tty.usbserial-140`;	// Warning! This is depended on your port!.
const port = new SerialPort({
	path: PATH,
	baudRate: 115200,
});


/**
 * Create an instance of the ReadlineParser with delimiter.
 * Then assign it to the pipe of the port.
 */
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

/**
 * When a line of data (message) is received, the event `data` is emitted.
 */
parser.on('data', (buffer) => {
	/**
	 * Print the received data.
	 */
	console.log(buffer);
});

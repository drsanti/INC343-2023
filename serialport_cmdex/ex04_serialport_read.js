
import { SerialPort } from 'serialport'
const PATH = `/dev/tty.usbserial-140`;	// Warning! This is depended on your port!.
const port = new SerialPort({
	path: PATH,
	baudRate: 115200,
});

port.on('open', () => {
	
});

/**
 * The `data` event.
 * This event is always emitted when data is received.
 */
port.on(`data`, (buffer) => {
	
	/**
	 * Print the received data.
	 */
	console.log(buffer);
});


import { SerialPort } from 'serialport'
const PATH = `/dev/tty.Bluetooth-Incoming-Port`;
const port = new SerialPort({
	path: PATH,
	baudRate: 115200,
});

/**
 * Check if the port ready for writing operation.
 * It it is ready, write a message/command to the port
 */
if (port.isOpen) {
	port.write(`led,1,2\r\n`); /** Toggle the LED0 */
}
else {
	console.warn(`The port is not opened!`);
}

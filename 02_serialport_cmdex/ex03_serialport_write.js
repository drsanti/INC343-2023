
import { SerialPort } from 'serialport'
const PATH = `/dev/tty.usbserial-140`;	// Warning! This is depended on your port!.
const port = new SerialPort({
	path: PATH,
	baudRate: 115200,
});

port.on('open', () => {
	/**
	 * After the port is opened, write a message/command to the port (MCU).
	 */
	port.write(`led,1,2\r\n`); /** Toggle the LED0 */
});




import { SerialPort } from 'serialport'
const PATH = `/dev/tty.Bluetooth-Incoming-Port`;
const port = new SerialPort({
	path: PATH,
	baudRate: 115200,
});

if (port.isOpen) {
	/** Write a command to MCU */
	port.write(`led,1,2\r\n`);

	/** Wait 500 ms to be sure the response message is received */
	setTimeout(() => {
		/** Read received data from the port buffer */
		let data = port.read();

		/** Check if data is received */
		if(data) {
			/** Print the received data */
			console.log(data);
		}
		else {cd
			console.error(`No data received!`);
		}

	}, 500);
}
else {
	console.warn(`The port is not opened!`);
}

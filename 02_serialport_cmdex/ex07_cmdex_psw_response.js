
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline'

// const PATH = `/dev/tty.usbserial-140`;	// Warning! This is depended on your port!.
const PATH = `COM10`;						// Warning! This is depended on your port!.
const port = new SerialPort({
	path: PATH,
	baudRate: 115200,
});


console.log(`\nConnecting to the MCU via the ${PATH}.
Press the Push Button Switches (PSW0-PSW3) and check the result.\r\n`);


const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (buffer) => {

	let s = buffer;

	if(s.indexOf(`ok: `) >= 0) {
		s = s.replace(/\s/g, "");
		let ss = s.split(`:`);
		if(ss.length < 1) {
			console.error(`Wrong format: ${buffer}`);
		}
		else {
			s = ss[1];
			ss = s.split(`,`);

			/**
			 * Note: The `ss` an array contains data like this:
			 * ss[0] : `psw`			<-- device name
			 * ss[1] : `2`				<-- device id
			 * ss[2] : `1`				<-- device status (status of thePSW)
			 * ss[3] : `KEY_DOWN`		<-- device state (state of the PSW)
			 */

			/**
			 * Push Button Switch (PSW)
			 */
			if(ss[0] === `psw` && ss.length == 4) {
				
				/**
				 * Get id of the PSW.
				 */
				let id = ss[1];		// id: 0, 1, 2, 3

				/**
				 * Get status of the PSW.
				 */
				let status = ss[2];	// 0: OFF, 1: ON

				/**
				 * Get state name of the PSW.
				 */
				let state = ss[3];	// KEY_DOWN, KEY_UP


				/**
				 * Print information
				 */
				console.log(`MCU Response: ${ss[0]},${ss[1]},${ss[2]},${ss[3]}`);
			}

			/**
			 * Analog-to-Digital Converter (ADC)
			 */

			/**
			 * Check the next example
			 */
		}
	}
	else {
		console.error(`Wrong format: ${buffer}`);
	}
});

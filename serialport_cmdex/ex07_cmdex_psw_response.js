
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline'

const PATH = `/dev/tty.usbserial-140`;	// Warning! This is depended on your port!.
const port = new SerialPort({
	path: PATH,
	baudRate: 115200,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (buffer) => {
	
	buffer = `ok: psw,0,1,2`;

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
			 * Push Button Switch (PSW)
			 */
			if(ss[0] === `psw`) {
				
				/**
				 * Get id of the PSW
				 */
				//??

				/**
				 * Get status of the PSW
				 */
				//??

				/**
				 * Get state name of the PSW
				 */
				//??
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

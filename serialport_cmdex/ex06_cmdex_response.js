
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline'

const PATH = `/dev/tty.usbserial-140`;	// Warning! This is depended on your port!.
const port = new SerialPort({
	path: PATH,
	baudRate: 115200,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (buffer) => {

	/**
	 * Get data from the buffer.
	 */
	let s = buffer;

	/**
	 * Check if the response message contains `ok: `
	 */
	if(s.indexOf(`ok: `) >= 0) {
		
		/**
		 * Remove all white spaces
		 */
		s = s.replace(/\s/g, "");
		
		/**
		 * Split the string using the `:` separator
		 */
		let ss = s.split(`:`);
		
		/**
		 * Check number the string portions.
		 */
		if(ss.length < 1) {
			/**
			 * Wrong format!
			 */
			console.error(`Wrong format: ${buffer}`);
		}
		else {
			/**
			 * Get the second portion.
			 */
			s = ss[1];
			
			/**
			 * Split the string using the `,` separator
			 */
			ss = s.split(`,`);

			/**
			 * Print the string portions
			 */
			console.log(ss);

			/**
			 * Check the next example.
			 */
		}
	}
	else {
		/**
		 * Wrong format!
		 */
		console.error(`Wrong format: ${buffer}`);
	}
});


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
	 * Note:
	 * the `s` variable contains response message returned by MCU,
	 * for example
	 * `ok: psw,2,1,KEY_DOWN`
	 */

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
		 * Note: The `ss` is an two element array. 
		 * Each element contains data like this:
		 * ss[0] : `ok`
		 * ss[1] : `psw,2,1,KEY_DOWN`
		 */
		
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
			 * Get the second portion from the ss array.
			 * The 2nd portion contains something like this:
			 * `psw,2,1,KEY_DOWN`
			 */
			s = ss[1];
			
			/**
			 * Split the string using the `,` separator
			 */
			ss = s.split(`,`);

			/**
			 * Note: The `ss` an array contains data like this:
			 * ss[0] : `psw`			<-- device name
			 * ss[1] : `2`				<-- device id
			 * ss[2] : `1`				<-- device status (status of thePSW)
			 * ss[3] : `KEY_DOWN`		<-- device state (state of the PSW)
			 */

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

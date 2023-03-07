
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline'

// const PATH = `/dev/tty.usbserial-140`;	// Warning! This is depended on your port!.
const PATH = `COM10`;						// Warning! This is depended on your port!.
const port = new SerialPort({
	path: PATH,
	baudRate: 115200,
});


console.log(`\nConnecting to the MCU via the ${PATH}.
Change the Potentiometers (POT0-POT3) and check the result.\r\n`);


const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (buffer) => {

	let s = buffer;

	/**
	 * Note: `s` variable contains the MCU response message like this:
	 * `ok: adc,1,620,91,dec`  //** Note: In some boards, dec is replaced by -1, inc isreplaced by 1.
	 */
	if(s.indexOf(`ok: `) >= 0) {
		s = s.replace(/\s/g, "");
		let ss = s.split(`:`);
		if(ss.length < 1) {
			console.error(`Wrong format: ${buffer}`);
		}
		else {
			s = ss[1];			// `adc,1,620,91,dec`
			ss = s.split(`,`);

			/**
			 * Note: The `ss` an array contains data like this:
			 * ss[0] : `adc`			<-- device name
			 * ss[1] : `1`				<-- device id (adc channel)
			 * ss[2] : `620`			<-- adc value
			 * ss[3] : `91`				<-- delta value
			 * ss[4] : `dec`			<-- change direction (-1 or 'dec': decrease, 1 or 'inc': increase)
			 */

			/**
			 * Analog-to-Digital Converter (ADC)
			 */
			if(ss[0] === `adc` && ss.length == 5) {
				
				/**
				 * Get the id of the ADC.
				 */
				let id = ss[1];			// id: 0, 1, 2, 3

				/**
				 * Get the value of the ADC.
				 */
				let status = ss[2];		// 10-bit data (0-1023)

				/**
				 * Get the delta value of the ADC.
				 */
				let delta = ss[3];		// delta value

				/**
				 * Get the delta value of the ADC.
				 */
				let direction = ss[4];	// -1 or 'dec': decrease, 1 or 'inc': increase


				/**
				 * Print information
				 */
				console.log(`MCU Response: ${ss[0]},${ss[1]},${ss[2]},${ss[3]},${ss[4]}`);
			}
		}
	}
	else {
		console.error(`Wrong format: ${buffer}`);
	}
});


import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline'

// const PATH = `/dev/tty.usbserial-140`;	// Warning! This is depended on your port!.
const PATH = `COM10`;						// Warning! This is depended on your port!.
const port = new SerialPort({
	path: PATH,
	baudRate: 115200,
});


console.log(`\nConnecting to the MCU via the ${PATH}.
Press Push Button Switch or Change Potentiometers, and check the result.\r\n`);


const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));


/**
 * Process the Push Button Switch message received from the MCU.
 * 
 * Parameters:
 *  - id: Id of the PSW (0, 1, 2, 3).
 *  - status: Status of the PSW (0: OFF, 1: ON).
 *  - state: State name of the PSW (KEY_DOWN, KEY_UP).
 */
function processPsw(id, status, state) {

	/**
	 * Example: Toggle LED0 and Generate Beep sound using PSW0.
	 */
	if(id == 0 && status == 1) {
		port.write(`led,0,2\r\n`);
		port.write(`buz,100,3500,50\r\n`);
	}


	/**
	 * Problem #1: Toggle LEDs using PSWs.
	 * Requirements:
	 *  - The LEDi will be toggled when the PSWi is pressed (i is Id of the PSW and LED).
	 *    For example, if the PSW2 is pressed, the LED2 is Toggle.
	 */

	/**
	 * Problem #2: Control LED2 using PSW0 and PSW1.
	 * Requirements:
	 *  - When the PSW1 is pressed, LED2 is turned ON.
	 *  - When the PSW0 is pressed, LED2 is turned OFF.
	 */

	/**
	 * Problem #3: Generate Beep sounds using PSWs.
	 * Requirements:
	 *  - When PSW0 is pressed, generate beep sound 0.5 seconds, 1.5kHz. 
	 *  - When PSW1 is pressed, generate beep sound 0.5 seconds, 2.0kHz. 
	 *  - When PSW2 is pressed, generate beep sound 0.5 seconds, 3.0kHz. 
	 *  - When PSW3 is pressed, generate beep sound 0.5 seconds, 4.0kHz. 
	 */
}


/**
 * Process the Analog Inputs (POTs) message received from the MCU.
 * 
 * Parameters:
 *  - id: Id of the PSW (0, 1, 2, 3).
 *  - value: Value of the ADC (10-bit data, 0-1023).
 *  - delta: Delta value of the ADC (current value - previous value).
 *  - direction: Change direction of the ADC (-1: decrease, 1: increase).
 */
function processAdc(id, value, delta, direction) {


	/**
	 * Example: Generate the Beep sound when the analog input channel 1 (ADC1, LDR)
	 * is changed with the delta value greater than 30.
	 * If the direction is -1 (decrease), generate beep sound 100ms, 1.5kHz, turn LED0 ON.
	 * If the direction is  1 (increase), generate beep sound 100ms, 3.5kHz, turn LED3 ON
	 */
	if(id == 1 && delta > 30) {

		console.log(`value: ${value}, delta: ${delta}`);

		port.write(`led,0,0\r\n`);	// Turn LED0 OFF
		port.write(`led,3,0\r\n`);	// Turn LED3 OFF

		if(direction == 'dec') {
			port.write(`led,0,1\r\n`);		// Turn LED1 ON
			port.write(`buz,100,1500,50\r\n`);	// Beep 100ms, 1.5kHz
		}
		else if(direction == 'inc') {
			port.write(`led,3,1\r\n`);		// Turn LED3 ON
			port.write(`buz,100,3500,50\r\n`);	// Beep 100ms, 3.5kHz
		}
	}
	
	
	/**
	 * Problem #1: Control LEDs by environment light intensity.
	 * Requirements:
	 *  - Turn all LEDs ON  when the environment light intensity goes low.
	 *  - Turn all LEDs OFF when the environment light intensity goes high.
	 */


	/**
	 * Problem #2: Blink LED0 with different blinking rate (frequency).
	 * Requirements:
	 *  - When the environment light intensity goes low,  LED0 blinks with higher frequency.
	 *  - When the environment light intensity goes high, LED0 blinks with lower frequency.
	 * 
	 */


	/**
	 * Problem #3: Generate variable frequency beep sound.
	 * Requirements:
	 *  - When the environment light intensity goes low,  beep frequency goes low.
	 *  - When the environment light intensity goes high, beep frequency goes high.
	 */
}



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
			 * Push Button Switch (PSW)
			 */
			/**
			 * Note: The `ss` an array contains data like this:
			 * ss[0] : `psw`			<-- device name
			 * ss[1] : `2`				<-- device id
			 * ss[2] : `1`				<-- device status (status of thePSW)
			 * ss[3] : `KEY_DOWN`		<-- device state (state of the PSW)
			 */
			if(ss[0] === `psw` && ss.length == 4) {
				processPsw(ss[1], ss[2], ss[3]);
			}

			/**
			 * Analog-to-Digital Converter (ADC)
			 */
			/**
			 * Note: The `ss` an array contains data like this:
			 * ss[0] : `adc`			<-- device name
			 * ss[1] : `1`				<-- device id (adc channel)
			 * ss[2] : `620`			<-- adc value
			 * ss[3] : `91`				<-- delta value
			 * ss[4] : `-1`				<-- change direction (-1: decrease, +1: increase)
			 */
			else if(ss[0] === `adc` && ss.length == 5) {
				processAdc(ss[1], ss[2], ss[3], ss[4]);
			}
			else {
				/**
				 * It is not `psw` or `adc`.
				 */	
			}
		}
	}
	else {
		console.error(`Wrong format: ${buffer}`);
	}
});

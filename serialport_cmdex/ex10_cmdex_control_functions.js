
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline'

// const PATH = `/dev/tty.usbserial-140`;	// Warning! This is depended on your port!.
const PATH = `COM10`;						// Warning! This is depended on your port!.
const port = new SerialPort({
	path: PATH,
	baudRate: 115200,
});


console.log(`\nConnecting to the MCU via the ${PATH}.
Press the Push Button Switch and check the LEDs and Beep sound.\r\n`);


const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));



/**
 * Turn ON the target LED.
 * Parameter:
 * - id: Id of the target LED (0, 1, 2, 3).
 */
function ledOn(id) {
	port.write(`led,${id},1\r\n`);
}


/**
 * Turn OFF the target LED.
 * Parameter:
 * - id: Id of the target LED (0, 1, 2, 3).
 */
function ledOff(id) {
	port.write(`led,${id},0\r\n`);
}


/**
 * Toggle the target LED.
 * Parameter:
 * - id: Id of the target LED (0, 1, 2, 3).
 */
function ledToggle(id) {
	port.write(`led,${id},2\r\n`);
}


/**
 * Control the target LED according to the given action code.
 * Parameters:
 * - id: Id of the target LED (0, 1, 2, 3).
 * - action: Control (Action) code (0: off, 1: on, 2: toggle)
 */
function ledCtrl(id, action) {
	port.write(`led,${id},${action}\r\n`);
}


/**
 * Write 4-bit data to the LEDs (LED0-LED3).
 * Parameter:
 * - data: Data to be written to the LEDs.
 */
function ledWrite(data) {
	for(let id=0; id<4; id++) {
		let action = data & 0x01;	/** action: 0 or 1 	*/
		data = data >> 1;			/** shift-right 	*/
		port.write(`led,${id},${action}\r\n`);
	}
}


/**
 * Generate beep sound with the given parameters.
 * Parameters:
 * - duration: Beep sound interval (0-65535).
 * - frequency: Beep sound frequency (0-65535). 
 * - power: Beep sound power (0-100).
 */
function beep(duration, frequency, power) {
	port.write(`buz,${duration},${frequency},${power}\r\n`);	
}


/**
 * Homework:
 * Turn another cmdex commands, for example, `fls`, `blk`, `cps` and others, to the JavaScript functions.
 */




function processPsw(id, status, state) {

	/**
	 * TODO:
	 * Test the functions below one-by-one.
	 */

	if(state === `KEY_UP`) {
		return;
	}


	/** 1 - LED-ON 		*/
	// ledOn(id);

	/** 2 - LED-OFF 	*/
	// ledOff(id);

	/** 3 - LED-TOGGLE 	*/
	// ledToggle(id);

	/** 4 - LED-CONTROL */
	// ledCtrl(id, status);

	/** 5 LED-WRITE		*/
	// ledWrite(id);

	/** 6 BEEP-SOUND	*/
	beep(50, 2000+(id*1000), 50);	/** Interval, Frequency, Power */
}

function processAdc(id, value, delta, direction) {
	/**
	 * Homework:
	 * Use the ADC's parameters to control the LEDs and Beep sound.
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

			if(ss[0] === `psw` && ss.length == 4) {
				processPsw(ss[1], ss[2], ss[3]);
			}
			else if(ss[0] === `adc` && ss.length == 5) {
				processAdc(ss[1], ss[2], ss[3], ss[4]);
			}
			else {
			}
		}
	}
	else {
		console.error(`Wrong format: ${buffer}`);
	}
});

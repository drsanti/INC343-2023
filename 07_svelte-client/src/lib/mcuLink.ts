

let _data: McuData;
let _getInterval = 0;

const request = async (url: string, callback: (data: McuData) => void) => {
	const response = await fetch(`http://localhost:3033/api/data`);
	_data = await response.json();
	callback?.(_data);
}

export const mcuLink = {

	start: (callback: (data: McuData) => void) => {

		stop();

		_getInterval = setInterval(async () => {
			request(`http://localhost:3033/api/data`, callback);
		}, 1000);
	},

	stop: () => {
		clearInterval(_getInterval);
	},

	requestData: (callback: (data: McuData) => void) => {
		request(`http://localhost:3033/api/data`, callback);
		return _data;
	},

	mcuData: (): McuData => {
		return _data;
	},

	ledGet: (id: number): McuLedData => {
		return _data.leds[id];
	},

	pswGet: (id: number): McuPswData => {
		return _data.psws[id]
	},

	adcGet: (id: number): McuAdcData => {
		return _data.adcs[id];
	},

	// app.get('/api/:tag/:id/:act', async (req, res)
	ledOn: async (id: number) => {
		const response = await fetch(`http://localhost:3033/api/led/${id}/on`);
		return await response.json();
	},

	ledOff: async (id: number) => {
		const response = await fetch(`http://localhost:3033/api/led/${id}/off`);
		return await response.json();
	},

	ledInv: async (id: number) => {
		const response = await fetch(`http://localhost:3033/api/led/${id}/inv`);
		return await response.json();
	},

	/**
	 * 
	 * @param interval Beep interval in milliseconds.
	 * @param frequency Beep frequency in Hertz.
	 * @param percentPower Beep power 0 - 100 (percent).
	 */
	beep: async (interval: number, frequency: number, percentPower: number) => {
		const audioContext = new AudioContext();
		const gainNode = audioContext.createGain();
		gainNode.connect(audioContext.destination);
		gainNode.gain.value = Math.max(0, Math.min(1, percentPower/100));
		const oscillator = audioContext.createOscillator();
		oscillator.connect(gainNode);
		oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Frequency of 440Hz (A4)
		oscillator.type = 'sine'; // can be 'sine', 'square', 'triangle', or 'sawtooth'
		oscillator.start();
		setTimeout(() => {
			oscillator.stop();
		}, interval);
	},

	timeGet: () => {
		const zp2 = (x: number) => (x < 10 ? `0${x}` : `${x}`);
		const zp3 = (x: number) => (x < 100 ? `00${x}` : x < 10 ? `0${x}` : `${x}`);
		const d = new Date();
		return `${zp2(d.getHours())}:${zp2(d.getMinutes())}:${zp2(d.getSeconds())}.${zp3(d.getMilliseconds())}`
	}
}
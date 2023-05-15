import EventEmitter from "events";
import { Log } from "./Log";


type NullUndefinedCallback = null | undefined

export interface McuMessageCallbacks {
	onAdc?: (id: number, value: number, delta: number, direction: number) => void | NullUndefinedCallback;
	onLed?: (id: number, value: boolean) => void | NullUndefinedCallback;
	onPsw?: (id: number, value: boolean, state: string) => void | NullUndefinedCallback;
	onErr?: (err: string) => void | NullUndefinedCallback;
}

export interface McuLedData {
	id: number;
	value: boolean;
	info?: string;
}

export interface McuPswData {
	id: number;
	value: boolean;
	state: string;
	info?: string;
}

export interface McuAdcData {
	id: number;
	value: number;
	delta: number;
	direction: number;
	info?: string;
}

export interface McuData {
	led: McuLedData[];
	psw: McuPswData[];
	adc: McuAdcData[];
}

export type McuResponseParserMode = "SIM" | "MCU";


export class McuResponseParser extends EventEmitter {

	private log = new Log("McuResponseParser");


	public ledData: McuLedData[] = [];
	public pswData: McuPswData[] = [];
	public adcData: McuAdcData[] = [];

	public mcuData: McuData;

	private ledSimEnabled = false;
	private pswSimEnabled = false;
	private adcSimEnabled = false;

	constructor(private mode: McuResponseParserMode, private callbacks: McuMessageCallbacks) {

		super();

		this.callbacks = callbacks;

		for (let i = 0; i < 4; i++) {
			this.ledData[i] = { id: i, value: false, info: `led.${i}` };
			this.pswData[i] = { id: i, value: false, state: "KEY_UP", info: `psw.${i}` };
			this.adcData[i] = { id: i, value: 0.00, delta: 0.00, direction: 1, info: `adc.${i}` };
		}

		this.mcuData = {
			led: this.ledData,
			psw: this.pswData,
			adc: this.adcData,
		}

		this.setOperationMode(mode);
		if (this.mode == "SIM") {
			// this.enableLedSim(true); /** Should be disabled */
			this.enablePswSim(true);
			this.enableAdcSim(true);
		}
	}

	public setOperationMode = (mode: McuResponseParserMode) => {
		if (mode == "SIM") {
			this.startSimulator();
		}
		else {
			this.stopSimulator();
		}

		this.log.wl(`The McuResponseParser is working in ${this.mode} mode.`.yellow);
	}


	public dispatchLedEvent(event: string, data: McuLedData) {
		this.emit(event, data);
	}

	public dispatchPswEvent(event: string, data: McuPswData) {
		this.emit(event, data);
	}

	public dispatchAdcEvent(event: string, data: McuAdcData) {
		this.emit(event, data);
	}

	public dispatchMcuEvent(event: string, data: McuData) {
		this.emit(event, data);
	}

	public getLedData = () => {
		return this.ledData;
	}
	public getPswData = () => {
		return this.pswData;
	}
	public getAdcData = () => {
		return this.adcData;
	}
	public getMcuData = () => {
		return this.mcuData;
	}

	/** called by McuInterface.messageCallback */
	public parse(line: string): void {



		let s = line;
		if (s.indexOf(`ok: `) >= 0) {
			s = s.replace(/\s/g, "");
			let ss = s.split(`:`);
			if (ss.length < 1) {
				if (this.callbacks.onErr) {
					this.callbacks.onErr(`The received line "${line}" is rejected.`);
				}
			}
			else {
				s = ss[1];
				ss = s.split(`,`);



				if (ss[0] === `psw` && ss.length == 4) {
					// psw,2,0,KEY_UP
					const id = Number(ss[1]);
					const value = Number(ss[2]) === 1;
					const state = ss[3];
					this.pswData[id] = { id, value, state, info: `psw.${id}.${value ? "on" : "off"}` };
					this.callbacks?.onPsw?.(id, value, state);
					this.dispatchPswEvent(`psw`, this.pswData[id]);
				}
				else if (ss[0] === `adc` && ss.length == 5) {
					// adc,1,253,27,-1
					const id = Number(ss[1]);
					const value = Number(ss[2]);
					const delta = Number(ss[3]);
					const direction = Number(ss[4]);
					this.adcData[id] = { id, value, delta, direction, info: `adc.${id}.${value}` };
					this.callbacks?.onAdc?.(id, value, delta, direction);
					this.dispatchAdcEvent(`adc`, this.adcData[id]);
				}
				else if (ss[0] === `led` && ss.length == 4) {
					// led,1,2,0
					const id = Number(ss[1]);
					const value = Number(ss[3]) === 1;
					this.ledData[id] = { id, value, info: `led.${id}.${value ? "on" : "off"}` };
					this.callbacks?.onLed?.(id, value);
					this.dispatchLedEvent(`led`, this.ledData[id]);
				}
				else if (ss[0] === `buz` && ss.length == 4) {
					// buz,50,2000,100
				}
				else if (ss[0] === `fls` && ss.length == 3) {
					// fls,2,400
				}
				else {
					if (this.callbacks.onErr) {
						this.callbacks.onErr(`The command "${line}" is not accepted.`);
					}
				}
			}
		}
		else {
			if (this.callbacks.onErr) {
				this.callbacks.onErr(`The received line "${line}" is rejected.`);
			}
		}
	}




	public enableLedSim = (enabled: boolean) => {
		this.ledSimEnabled = enabled;
		this.log.wl(`LED simulation us ${enabled ? "enabled" : "disabled"}.`.yellow);
	}

	public enablePswSim = (enabled: boolean) => {
		this.pswSimEnabled = enabled;
		this.log.wl(`PSW simulation us ${enabled ? "enabled" : "disabled"}.`.yellow);
	}

	public enableAdcSim = (enabled: boolean) => {
		this.adcSimEnabled = enabled;
		this.log.wl(`ADC simulation us ${enabled ? "enabled" : "disabled"}.`.yellow);
	}




	private _simInterval?: NodeJS.Timer;
	private stopSimulator = () => {
		clearInterval(this._simInterval);
	}

	private startSimulator = () => {

		const adc: number[] = [512, 512, 512, 512];
		const led: number[] = [0, 0, 0, 0];
		let id = 0;

		this._simInterval = setInterval(() => {
			// LED
			if (this.ledSimEnabled) {
				// id = Math.floor(Math.random()*4);
				// const lv = Math.floor(Math.random()*2);
				// this.parse(`ok: led,${id},${lv},${lv}\r\n`); 

				id = Math.floor(Math.random() * 4);
				const lv = led[id] == 1 ? 0 : 1;
				led[id] = lv
				this.log.wl(`SIM: led, ${id}, ${lv}`.blue);
				this.parse(`ok: led,${id},2,${lv}\r\n`);
			}

			// PSW
			if (this.pswSimEnabled) {
				id = Math.floor(Math.random() * 4);
				const sv = Math.floor(Math.random() * 2);
				this.log.wl(`SIM: psw,${id},${sv},${sv ? "KEY_DOWN" : "KEY_UP"}`.cyan);
				this.parse(`ok: psw,${id},${sv},${sv ? "KEY_DOWN" : "KEY_UP"}\r\n`);
			}
			// ADC
			if (this.adcSimEnabled) {
				id = Math.floor(Math.random() * 4);
				const av = Math.floor(Math.random() * 1024);
				const delta = av - adc[id];
				adc[id] = av;
				this.log.wl(`SIM: adc,${id},${av},${delta},${delta < 0 ? "-1" : "1"}`.magenta);

				this.parse(`ok: adc,${id},${av},${delta},${delta < 0 ? "-1" : "1"}\r\n`);

			}
		}, 2000);
	}
}


import { ReadlineParser, SerialPort } from "serialport";
import { Log } from "./Log";


type McuConnectedCallback = (port: string) => void;
type McuMessageCallback = (message: string) => void;

export interface McuInterfaceOptions {
	connectCallback?: McuConnectedCallback;
	messageCallback: McuMessageCallback;
}

export type McuInterfaceMode = "SIM" | "MCU";

//
export class McuInterface {

	private log = new Log("McuInterface");

	constructor(private mode: McuInterfaceMode, private callbacks: McuInterfaceOptions) {

		this.callbacks = callbacks;
		this.setOperationMode(mode);
		// if (this.mode == "MCU") {
		// 	this.mcuComputerLink();
		// }
		// else {
		// 	this.log.wl(`The MCU is running in simulation mode.`.yellow);
		// }
	}


	public setOperationMode = (mode: McuInterfaceMode) => {
		if (mode == "MCU") {
			this.mcuComputerLink();
			this.log.wl(`The MCU is running in uart-serial mode.`.yellow);
		}
		else {
			this.mcuStopCommunication();
			this.log.wl(`The MCU is running in simulation mode.`.yellow);
		}
	}

	private mcuComputerLink = async () => {

		this.mcuListPorts().then((ports: string[]) => {

			this.mcuFindPort(ports).then((port: string) => {

				this.log.wr(`MCU is connected via port `.green);
				this.log.wn(`${port}\n`.yellow);

				this.mcuStartCommunication(port);

			}).catch(err => this.log.wl(`Failed: ${err}`.red));

		}).catch(err => this.log.wl(`Failed: ${err}`.red));
	}


	public getOperationMode = (): McuInterfaceMode => {
		return this.mode;
	}


	private mcuListPorts = (): Promise<string[]> => {

		return new Promise((resolve) => {

			let retryCnt = 0;
			const ports: string[] = [];

			this.log.wl("Serial Auto Start...".cyan);
			const timer = setInterval(async () => {

				this.log.wl(`\nSearching serial port...(${++retryCnt})`);
				const portInfoArr = await SerialPort.list();

				this.log.wl(`${portInfoArr.length} port(s) found:`.green);
				portInfoArr.forEach(info => {
					this.log.wl(`  + ${info.path}`.green);
					ports.push(info.path);
				});

				if (portInfoArr.length > 0) {
					clearInterval(timer);
					resolve(ports);
				}
			}, 1000);
		});
	}


	private mcuFindPort = (ports: string[]): Promise<string> => {

		return new Promise((resolve, reject) => {

			const timeout = setTimeout(() => {
				reject(`MCU auto detection timeout`);
			}, 5000);

			this.log.wl("MCU Auto Detect Start...".green);

			let detected = false;

			for (let i = 0; i < ports.length && !detected; i++) {
				const port = ports[i];
				this.log.wl(`Try to connect on port ${port}`.yellow);
				const serial = new SerialPort({ path: port, baudRate: 115200 });
				const parser = serial.pipe(new ReadlineParser({ delimiter: '\r\n' }));

				serial.on(`open`, async () => {

					/** On Windows, the DRT abd RTS is inactive, MCU is not restarted. */
					serial.set({ dtr: false, rts: true });
					await new Promise(resolve => setTimeout(resolve, 50));


					/** On Mac, the DRT abd RTS is active after the port is opened. */
					serial.set({ dtr: false, rts: false });
					await new Promise(resolve => setTimeout(resolve, 50));

					parser.on("data", (data: string) => {
						if (data.indexOf(`ok: `) !== -1) {
							if (serial.isOpen) serial.close();
							detected = true;
							clearTimeout(timeout);
							resolve(`${port}`);
						}
					});
				});
			}
		});
	}


	private serial?: SerialPort;

	private mcuStartCommunication = async (port: string) => {


		if (this.serial?.isOpen) {
			this.serial.close();
			this.log.wl("closing...".red);
		}

		await new Promise(resolve => setTimeout(resolve, 1000));


		this.serial = new SerialPort({ path: port, baudRate: 115200 });



		const parser = this.serial.pipe(new ReadlineParser({ delimiter: '\r\n' }));

		this.log.wl("opening...".green);

		/** On Open */
		this.serial.on(`open`, () => {

			this.serial?.set({ dtr: false, rts: false }); /**!! Required on MAC */

			let lineCnt = 0;

			/** On Line Received */
			parser.on("data", (data: string) => {

				if (this.callbacks.connectCallback && lineCnt === 0) {
					this.callbacks.connectCallback(port);
				}

				lineCnt++;

				if (this.callbacks.messageCallback) {
					this.callbacks.messageCallback(data);
				}
			});
		});
	}

	private mcuStopCommunication = () => {
		if (this.serial?.isOpen) {
			this.serial.close();
		}
	}


	private _simLeds = [false, false, false, false];

	public writeCommand = (command: string): void => {
		if (this.mode == "MCU") {
			this.serial?.write(command);
		}
		else {
			// SIM
			if (this.callbacks.messageCallback) {

				// command format: led,0,1

				if (command.indexOf("led,") == 0) {

					const ss = command.split(",");
					if (ss.length != 3) return;

					const id = Number(ss[1]);
					const act = Number(ss[2]);

					// response format: led,<id>,<act><value>

					if (act === 0) { // off
						this.callbacks.messageCallback(`ok: led,${id},${act},0\r\n`);
					}
					else if (act === 1) { // on
						this.callbacks.messageCallback(`ok: led,${id},${act},1\r\n`);
					}
					else if (act === 2) { // toggle
						this._simLeds[id] = !this._simLeds[id];
						this.callbacks.messageCallback(`ok: led,${id},${act},${this._simLeds[id] ? "1" : "0"}\r\n`);
					}
					else if (act === 3) { // read
						this.callbacks.messageCallback(`ok: led,${id},${act},${this._simLeds[id] ? "1" : "0"}\r\n`);
					}
				}
			}
		}
	}

	public ledOn(id: number) {
		this.writeCommand(`led,${id},1\r\n`);
	}
	public ledOff(id: number) {
		this.writeCommand(`led,${id},0\r\n`);
	}
	public ledToggle(id: number) {
		this.writeCommand(`led,${id},2\r\n`);
	}
	public ledGet(id: number) {
		this.writeCommand(`led,${id},3\r\n`);
	}

	public beep(interval: number, freq: number, power: number) {
		this.writeCommand(`buz,${interval},${freq},${power}\r\n`);
	}
}

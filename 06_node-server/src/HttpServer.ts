import express from 'express';
import cors from 'cors';
import http from "http"
import path from 'path';
import { McuResponseParser } from './McuResponseParser';
import { McuInterface } from './McuInterface';
import { Log } from './Log';


export class HttpServer {

	private log = new Log("HttpServer");

	private server: http.Server;

	private app = express();


	/** `http.Server` is used as input parameter of the `WSocketServer` */
	public getServer = (): http.Server => {
		return this.server;
	}


	constructor(port: number, staticDir: string, private mcuInterface: McuInterface, private mcuResponseParser: McuResponseParser) {

		this.mcuInterface = mcuInterface;
		this.mcuResponseParser = mcuResponseParser;

		const app = this.app;

		app.use(cors());

		app.use(express.static(path.join(__dirname, staticDir)));

		this.server = app.listen(port, () => {
			//this.log.wl(`Server listening on port ${port}`.cyan);

			this.log.wl(`HTTP: http://localhost:${port}`.green);
			this.log.wl(`      http://127.0.0.1:${port}`.green);
		});

		// API route --------------------------------------------------------------
		app.get('/', (req, res) => {
			const filePath = path.join(__dirname, staticDir, `index.html`);
			res.sendFile(filePath);
		});


		app.get('/api/data', (req, res) => {
			res.send(JSON.stringify(this.mcuResponseParser.getMcuData()));
		});
		app.get('/api/read', (req, res) => {
			res.send(JSON.stringify(this.mcuResponseParser.getMcuData()));
		});

		app.get('/api/read/all', (req, res) => {
			res.send(JSON.stringify(this.mcuResponseParser.getMcuData()));
		});
		app.get('/api/read/led', (req, res) => {
			res.send(JSON.stringify(this.mcuResponseParser.getLedData()));
		});
		app.get('/api/read/psw', (req, res) => {
			res.send(JSON.stringify(this.mcuResponseParser.getPswData()));
		});
		app.get('/api/read/adc', (req, res) => {
			res.send(JSON.stringify(this.mcuResponseParser.getAdcData()));
		});



		// Individual Element
		app.get('/api/:tag/:id/:act', async (req, res) => {

			/**
			 * tag: led | psw | led
			 * id:  0 | 1 | 2 | 3
			 * 
			 * act(led): on | off | inv(toggle) | get(read)
			 * 
			 * act(psw): get(read) 
			 * 
			 * act(adc): get(read)
			 */

			const tag = req.params.tag;
			const id = Number(req.params.id);
			const act = req.params.act;


			/** tag */
			if (tag != "led" && tag != "psw" && tag != "adc") {
				res.json({ status: "error", message: `The tag "${tag}" is not allowed. Only "lde", "psw" and "adc" are allowed.` });
				return;
			}

			/** id */
			if (isNaN(id) || id < 0 || id > 3) {
				res.json({ status: "error", message: `The id "${id}" is not allowed. Only 0-3 are allowed.` });
				return;
			}


			// ----- led ----------------------------------------------------------
			if (tag == "led") {

				if (act != "on" &&
					act != "off" &&
					act != "inv" &&
					act != "toggle" &&
					act != "get" &&
					act != "read"
				) {
					res.json({ status: "error", message: `The led action "${act}" is not allowed. Only "on", "off", "inv", "toggle", "get", and "read" are allowed.` });
					return;
				}

				const _waitResponse = async (res: any, id: number) => {
					await new Promise(resolve => setTimeout(resolve, 100));
					res.send(JSON.stringify(mcuResponseParser.getLedData()[id]));
				}

				if (act == "on") {
					this.mcuInterface.ledOn(id);
					_waitResponse(res, id);
				}
				else if (act == "off") {
					this.mcuInterface.ledOff(id);
					_waitResponse(res, id);
				}
				else if (act == "inv" || act == "toggle") {
					this.mcuInterface.ledToggle(id);
					_waitResponse(res, id);
				}
				else if (act == "get" || act == "read") {
					this.mcuInterface.ledGet(id);
					_waitResponse(res, id);
				}
				else {
					res.json({ status: "error", message: `The led action "${act}" is not allowed. Only "on", "off", "inv", "toggle", "get", and "read" are allowed.` });
				}


			}

			else if (tag == "psw") {

				if (act == "get" || act == "read") {
					await new Promise(resolve => setTimeout(resolve, 100));
					res.send(JSON.stringify(mcuResponseParser.getPswData()[id]));
				}
				else {

					res.json({ status: "error", message: `The psw action "${act}" is not allowed. Only "get" or "read" are allowed.` });
				}
			}


			else if (tag == "adc") {
				if (act == "get" || act == "read") {
					await new Promise(resolve => setTimeout(resolve, 100));
					res.send(JSON.stringify(mcuResponseParser.getAdcData()[id]));
				}
				else {

					res.json({ status: "error", message: `The adc action "${act}" is not allowed. Only "get" or "read" are allowed.` });
				}
			}
			else {
				res.json({ status: "error", message: `The tag "${tag}" is not allowed.` });
			}
		});// app.get('/api/:tag/:id/:act', async (req, res) 



		app.get('/api/:tag/:time/:freq/:power', async (req, res) => {
			// http://localhost:3033/api/beep/100/1000/50
			const tag = req.params.tag;
			const time = Number(req.params.time);
			const freq = Number(req.params.freq);
			const power = Number(req.params.power);

			if (tag != "buz" && tag != "beep" && tag != "buzzer") {
				res.json({ status: "error", message: `The tag "${tag}" is not allowed.` });
				return;
			}

			if (isNaN(time) || time < 0 || time > 10000) {
				res.json({ status: "error", message: `The time "${time}" is not allowed. Only 1-10000 are allowed.` });
				return;
			}

			if (isNaN(freq) || freq < 5 || freq > 50e3) {
				res.json({ status: "error", message: `The freq "${freq}" is not allowed. Only 5-50000 are allowed.` });
				return;
			}

			if (isNaN(power) || power < 0 || power > 100) {
				res.json({ status: "error", message: `The power "${power}" is not allowed. Only 0-100 are allowed` });
				return;
			}


			this.mcuInterface.beep(time, freq, power);
			await new Promise(resolve => setTimeout(resolve, 100));
			res.json({ id: "buz", time: `${time}`, freq: `${freq}`, power: `${power}` });

		});
	}

}


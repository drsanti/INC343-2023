
const MODE = "SIM";

import { HttpServer } from "./HttpServer";
import { SystemConfig } from "./SystemConfig";
import { WSocketServer } from "./WSocketServer";
import { McuInterface } from './McuInterface';
import { McuLedData, McuResponseParser } from './McuResponseParser';
import { Log } from "./Log";

const log = new Log("Index");

const mi = new McuInterface(MODE, {
	connectCallback: (port: string) => {
		console.log(`Connected to ${port}`.bgCyan);
		// setInterval(() => {
		// 	for (let i = 0; i < 4; i++) {

		// 		const d = Math.random() > 0.5 ? "1" : "0";
		// 		mi.writeCommand(`led,${i},${d}\r\n`);
		// 	}
		// }, 2000);
	},
	messageCallback: (message: string) => mp.parse(message)
});


const mp = new McuResponseParser(MODE, {
	// onLed: (id: number, value: boolean) => {
	//	console.dir(mp.ledData);
	// },
	// onAdc: (id: number, value: number) => {
	// 	console.dir(mp.adcData);
	// },
	// onPsw: (id: number, value: boolean) => {
	// 	console.dir(mp.pswData);
	// }
});

// mp.enableLedSim(true);


mp.on(`led`, (data: McuLedData) => {
	log.wl(`${data.info}`.blue);
});

mp.on(`psw`, (data: McuLedData) => {
	log.wl(`${data.info}`.cyan);
});

mp.on(`adc`, (data: McuLedData) => {
	log.wl(`${data.info}`.magenta);
});

const httpServer = new HttpServer(SystemConfig.http.port, SystemConfig.http.staticDir, mi, mp);
new WSocketServer(httpServer.getServer(), mi, mp);



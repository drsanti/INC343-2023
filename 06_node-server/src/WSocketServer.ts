import * as WebSocket from "ws";
import http from "http";
import { SystemConfig } from "./SystemConfig";
import { McuAdcData, McuLedData, McuPswData, McuResponseParser } from "./McuResponseParser";
import { McuInterface } from "./McuInterface";
import { Log } from "./Log";


interface ISocket {
	socket: WebSocket;
	id: string;
}

export class WSocketServer {

	private log = new Log("WSocketServer");

	private wss;

	private sockets: ISocket[] = [];

	constructor(private server: http.Server, private mcuInterface: McuInterface, private mcuResponseParser: McuResponseParser) {

		this.mcuResponseParser = mcuResponseParser
		this.mcuInterface = mcuInterface;



		this.wss = new WebSocket.Server({ server: server, path: `/${SystemConfig.websocket.path}` });

		const { port } = server.address() as { port: number };
		const path = SystemConfig.websocket.path;
		this.log.wl(`WebSocket: http://localhost:${port}/${path}`.green);
		this.log.wl(`           http://127.0.0.1:${port}/${path}`.green);


		const mp = this.mcuResponseParser;


		mp.on(`adc`, (data: McuAdcData) => {
			this.sockets.forEach(obj => {
				obj.socket.send(JSON.stringify(data));
			});
		});

		mp.on(`led`, (data: McuLedData) => {
			this.sockets.forEach(obj => {
				obj.socket.send(JSON.stringify(data));
			});
		});

		mp.on(`psw`, (data: McuPswData) => {
			this.sockets.forEach(obj => {
				obj.socket.send(JSON.stringify(data));
			});
		});


		this.wss.on('connection', (client: WebSocket) => {
			this.registerClient(client);
		});
	}

	private registerClient = (client: WebSocket) => {

		this.addClient(client);

		client.on(`message`, (message: string) => {
			console.log(`Received message from client: ${message}`);
			client.send(`Hello from Server`);
		});

		client.on('close', () => {
			this.removeClient(client);
		});
	}

	private addClient = (client: WebSocket) => {
		const id = `ws-client-${Math.round((Math.random() * 10000))}`;
		this.sockets.push({ socket: client, id: id });
		console.log(`Client ${id} connected`);
	}

	private removeClient = (client: WebSocket) => {
		const obj = this.sockets.find(obj => obj.socket == client);
		if (obj) {
			const index = this.sockets.indexOf(obj);
			this.sockets.splice(index, 1);
			console.log(`Client ${obj.id} disconnected [${this.sockets.length}]`);
		}
	}

	private onClose = () => {
		console.log('Client disconnected');
	}
}

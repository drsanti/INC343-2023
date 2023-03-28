import * as http from 'http';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline'

const PATH = `COM12`;	/** Warning! This is depended on your port!. */
const port = new SerialPort({
	path: PATH,
	baudRate: 115200,
});

/**
 * Create the server after the target serial port is opened.
 */
port.on(`open`, () => {
	startServer();
});

/**
 * Create a ReadlineParser object.
 */
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));


/**
 * Process MCU' data if required.
 */
parser.on('data', (buffer) => {
	console.log(`mcu: ${buffer}`);
});


/**
 * Server
 * This function is called after the serialport is opened.
 * We can process web browser's requests and send commands to the MCU in this function.
 */
const startServer = () => {

	const PORT = 3000;

	http.createServer((req, res) => {

		/**
		 * Write the `http header` to client.
		 */
		res.writeHead(200, { 'Content-Type': 'text/html' });

		/** Check the request from the client and send the appropriate response back to the client */
		if (req.url == `/`) {
			res.write(`<h1 style="text-align: center">Welcome to web-based LED control</h1>`);
		}
		else if (req.url == `/favicon.ico`) {

		}
		else if (req.url == `/on`) {
			res.write(`<h3>LED: <span style="color:green">ON</span></h3>`);
			port.write("pwmd 0 0.9\r\n");
		}
		else if (req.url == `/off`) {
			res.write(`<h3>LED: <span style="color:red">OFF</span></h3>`);
			port.write("pwmp 0 stop\r\n");
		}
		else {
			res.write(`<h3>Command is not supported</h3>`);
		}

		/**
		 * Write end response to client.
		 */
		res.end();

	}).listen(3000, () => {
		/** The server object listens on the port PORT */
		console.log(`\nServer started and listening at port ${PORT}`);

		/**
		 * 
		 */
		console.log(`\nOpen a web browser and go to http://localhost:${PORT} or http://127.0.0.1:${PORT}`);
		console.log(`You can click one of the links above to open the default web browser.`);
		console.log(`After the server is restarted, refresh the web browser to check the latest result.`);
	});
}

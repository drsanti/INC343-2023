/** 
 * Import the `http` module.
 * To use the `import` (ES6 module), the `"type": "module"` must be added in the `package.json`.
 * 
 * The `require` (Common JS) can be used without adding the `"type": "module"` in the `package.json`.
 * Usage: const http = require('http');
 */
import * as http from 'http';

/**
 * Communication port
 */
const PORT = 3000;


/** create a server object */
http.createServer((req, res) => {

	/**
	 * Write a response message (plain text) to client.
	 */
	res.write('Welcome to the backend programming world!');

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
	console.log(`You can click one of the link above to open the default web browser.`);
	console.log(`After the server is restarted, refresh the web browser to check the latest result.`);
});

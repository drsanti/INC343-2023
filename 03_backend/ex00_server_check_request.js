/**
 * Import the `http` module.
 * Add `"type": "module"` in the `package.json` to use ES6.
 */
import * as http from 'http';
import * as querystring from 'querystring';
import * as url from 'url';

/**
 * Communication port
 */
const PORT = 3000;


/** create a server object */
http.createServer((req, res) => {

	/** Print request object */
	//console.log(req);

	/** Print request raw-header */
	//console.log(req.rawHeaders);

	/** Print request url */
	console.log(req.url);

	/** Print request method */
	//console.log(req.method);

	/** Print query parameters
	 *  Try this: http://127.0.0.1:3000/?x=1&y=2&z=3
	 */
	console.log(url.parse(req.url, true).query)

	/** 
	 * Write a response message (plain text) to client.
	 */
	res.write(`${req.method}: ${req.url}`);

	/**
	 * Write end response to client.
	 */
	res.end();

}).listen(PORT, () => {
	/** The server object listens on the port PORT */
	console.log(`\nServer started and listening at port ${PORT}`);

	/**
	 * 
	 */
	console.log(`\nOpen a web browser and go to http://localhost:${PORT} or http://127.0.0.1:${PORT}`);
	console.log(`You can click one of the links above to open the default web browser.`);
});

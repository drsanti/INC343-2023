/**
 * Import the `http` module.
 */
import * as http from 'http';

/**
 * Communication port
 */
const PORT = 3000;

/** create a server object */
http.createServer((req, res) => {

	/**
	 * Write the `http header` to client.
	 */
	res.writeHead(200, { 'Content-Type': 'text/html' });

	/** Print the  req.url */
	console.log(req.url);

	/** Check the request from the client and send the appropriate response back to the client */
	if (req.url == `/`) {
		res.write(`<h1 style="text-align: center">Welcome to web-based machine control and monitoring system</h1>`);
	}
	else if (req.url == `/favicon.ico`) {

	}
	else if (req.url == `/on`) {
		res.write(`<h3>Machine status: <span style="color:green">ON</span></h3>`);
	}
	else if (req.url == `/off`) {
		res.write(`<h3>Machine status: <span style="color:red">OFF</span></h3>`);
	}
	else if (req.url == `/temp`) {
		let temp = 35 + Math.random() * 40;
		res.write(`<h3>Machine Temperature: <span style="color:orange">${temp.toFixed(3)}</span></h3>`);
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
	console.log(`You can click one of the link above to open the default web browser.`);
	console.log(`After the server is restarted, refresh the web browser to check the latest result.`);
});

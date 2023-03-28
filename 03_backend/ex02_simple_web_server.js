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

	/**
	 * Write a response message (HTML) to client.
	 */
	res.write(`Welcome to the <b>backend</b> programming world!`);
	res.write(`<br>`);
	res.write(`<button>Click Me</button>`);
	res.write(`<input type="text">`);
	res.write(`<input type="checkbox">`);
	res.write(`<h3>Now it's time to learn 
		<span style="color: #ff8800;">HTML</span>,  
		<span style="color: #88ff00;">CSS</span> and
		<span style="color: #8800ff;">JavaScript</span>
		to make <u>awesome</u> web applications.`);

	res.write(`<h4 id=data>Data: 0.000</h4>`);

	/** JavaScript can also be sent to the client. */
	res.write(`
		<script>
			setInterval(()=>{
				document.getElementById('data').innerHTML = 'Data:' + Math.random().toFixed(3);
			},1000);
		</script>`);

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
	console.log(`After the server is restarted, refresh the web browser to check the latest result.`);
});

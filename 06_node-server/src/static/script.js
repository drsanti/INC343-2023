

const HOST = `127.0.0.1`;
const PORT = 3033;
const PATH = `ternion`;

let socket = undefined;//new WebSocket(`ws://${HOST}:${PORT}/${PATH}`);

let reconnectInterval = undefined;



const connect = () => {
	
	socket = new WebSocket(`ws://${HOST}:${PORT}/${PATH}`);

	socket.addEventListener('open', () => {

		clearInterval(reconnectInterval); 

		console.log('Connected to WebSocket server');

		// Send a message to the server
		socket.send('Hello, server!');
	});

	socket.addEventListener('message', (event) => {
		const message = event.data;
		try{
			console.log(JSON.parse(message));
		}
		catch(e) {
			console.log(message);
		}
	});

	socket.addEventListener('close', () => {
		console.log('Disconnected from WebSocket server');
		reconnect();
	});

	socket.addEventListener('error', (error) => {
		console.error('WebSocket connection error:', error);
		reconnect(); // Attempt to reconnect when an error occurs
	  });

}
const reconnect = () => {

	clearInterval(reconnectInterval); // Clear the previous interval (if any)
	
	reconnectInterval = setInterval(() => {
    	console.log('Attempting to reconnect WebSocket...');
    	connect();
  }, 2000);
}



reconnect();


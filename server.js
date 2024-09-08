const WebSocket = require('ws');
const port = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port });

wss.on('connection', function connection(ws) {
  console.log('A client connected');

  ws.on('message', function incoming(message) {
    console.log('Received:', message);
    const data = JSON.parse(message);

    if (data.type === 'requestData') {
      ws.send(JSON.stringify({ type: 'responseData', pageData: { token: 'admin' } }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server running on port ${port}`);

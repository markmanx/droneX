const server = require('http').createServer();
const socket = require('socket.io')(server);

const clients = {
  simulator: null,
  device: null
}

const onReceiveMessageFromDevice = (data) => {
  if (!clients.simulator) {
    return;
  }

  clients.simulator.emit('message', data);
}

const connectClient = (clientType, client) => {
  const currentClient = clients[clientType];

  if (currentClient) {
    currentClient.disconnect();
  }

  if (clientType === 'device') {
    client.on('message', onReceiveMessageFromDevice);
  }

  clients[clientType] = client;
}

const onClientDisconnect = (clientType) => {
  clients[clientType] = null;
}

socket.on('connection', client => {
  const { clientType } = client.handshake.query;

  if (clientType === 'simulator' || clientType === 'device') {
    connectClient(clientType, client);
  }

  client.on('disconnect', () => { 
    if (clientType === 'simulator' || clientType === 'device') {
      onClientDisconnect(clientType);
    }
  });
});

server.listen(3001);
const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast function
wss.broadcast = function broadcast(data) {
      wss.clients.forEach(function each(client) {
        client.send(data);
      })
    }

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Select a random number between 1 & 4
  let randomColor = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

  // Set online user object
  var onlineUsers = {
    type: "counter",
    userCount: wss.clients.size
  }
  onlineUsers = JSON.stringify(onlineUsers);
  wss.clients.forEach(function each(client) {
    client.send(onlineUsers);
  })

  // Data that is `processed` everytime a message is received
  ws.on('message', (data) => {
    data = JSON.parse(data);
    switch (data.type) {
      case 'postMessage':
        data.id = uuidv1();
        data.type = "incomingMessage";
        data.colorID = randomColor;
        data = JSON.stringify(data);
        break;
      case 'postNotification':
        data.id = uuidv1();
        data.type = "incomingNotification";
        data = JSON.stringify(data);
        break;
    }
    wss.broadcast(data);
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => { 
    console.log('Client disconnected');
    onlineUsers = {
      type: "counter",
      userCount: wss.clients.size
    }
    onlineUsers = JSON.stringify(onlineUsers);
    wss.clients.forEach(function each(client) {
      client.send(onlineUsers);
    })
  })
})
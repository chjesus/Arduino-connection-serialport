if (process.argv[2] == undefined) {
  global.console.log('Usage: node application.js <COM#>');
  process.exit(1);
}

let portCom = process.argv[2];

const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + '/public'));
server.listen(4000, () => {
  console.log('servidor en puerto 4000');
});

const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort(portCom, { baudRate: 9600 });

const parser = port.pipe(new ReadLine({ delimiter: '\n' }));

parser.on('open', function () {
  console.log('connection is opened');
});

io.on('connection', () => {
  parser.on('data', function (data) {
    io.emit('ArduinoMessage', data);
  });
});

parser.on('error', (err) => console.log(err));
port.on('error', (err) => console.log(err));

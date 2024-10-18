import express from 'express';
import http from 'node:http';
import { Server, Socket } from 'socket.io';

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on('connection', (socket: Socket) => {
  console.log(`A user connected. Socket ID: ${socket.id}`);
});

app.get('/', (req, res) => {
  console.log('hello world')
  res.send('<h1>hello world</h1>');
});

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

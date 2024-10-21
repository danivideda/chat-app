import express from 'express';
import http from 'node:http';
import { Server, Socket } from 'socket.io';
import { SocketEvent } from '../../common/dist/SocketEvent';
import cors from 'cors';
import ip from 'ip'

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on(SocketEvent.SEND_MESSAGE, (message: string) => {
    io.emit(SocketEvent.RECEIVE_MESSAGE, message);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.use(cors());
app.get('/', (req, res) => {
  console.log('hello world');
  return res.send('<h1>hello world</h1>');
});

server.listen(PORT, () => {
  console.log(`Server started on ${ip.address()}:${PORT}`);
});

import { io } from 'socket.io-client';

console.log(__API_URL__)

const socket = io(__API_URL__);

export default socket;

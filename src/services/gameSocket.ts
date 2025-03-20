// src/gameService.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', {
  transports: ["websocket"],
  withCredentials: true,
}); // Connect to NestJS WebSocket server

// Listen for match start
socket.on('matchStarted', (data) => {
  console.log(data.message); // Show match started message
});

// Listen for game updates
socket.on('gameUpdate', (update) => {
  console.log('Game update:', update); // Show game state updates
});

export const joinRoom = (roomId) => {
  socket.emit('joinRoom', roomId);
};

export const startMatch = (roomId) => {
  socket.emit('startMatch', roomId);
};

export const sendGameUpdate = (roomId, update) => {
  socket.emit('gameUpdate', { roomId, update });
};

export default socket;

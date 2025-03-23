// src/gameService.js
import { io } from 'socket.io-client';
import store from "../store/index";
import { setMatch } from '../store/modules/main';
import { deepCopy } from '../utils';



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
  const match = deepCopy(store.getState().main.match);
  match.panels.forEach((panel, i, arr) => {
    if(panel.active) arr[i].active = false;
    else arr[i].active = true;
  })
  store.dispatch(setMatch(match))
  console.log('Game update:', update); // Show game state updates
});

export const joinRoom = (roomId) => {
  socket.emit('joinRoom', roomId);
};

export const startMatch = (roomId) => {
  socket.emit('startMatch', roomId);
};

export const sendGameUpdate = (roomId, ownerId, update) => {
  socket.emit('gameUpdate', { roomId, ownerId, update });
};

export default socket;

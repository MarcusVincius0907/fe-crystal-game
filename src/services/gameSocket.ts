// src/gameService.js
import { io } from 'socket.io-client';
import store from "../store/index";
import { getMatchById, setOpponentLoader } from '../store/modules/main';
import SessionStorageService, { StorageKeys } from './sessionStorageService';

const sessionStorageService = new SessionStorageService();

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
  const matchId = sessionStorageService.getItem(StorageKeys.MATCH_ID);
  const ownerId = sessionStorageService.getItem(StorageKeys.OWNER_ID);
  store.dispatch(getMatchById({matchId, ownerId}));
  store.dispatch(setOpponentLoader(false));
});

export const joinRoom = (roomId) => {
  socket.emit('joinRoom', roomId);
};

export const startMatch = (roomId) => {
  socket.emit('startMatch', roomId);
};

export const sendGameUpdate = (roomId, ownerId, update) => {
  socket.emit('gameUpdate', { roomId, ownerId, update });
  store.dispatch(setOpponentLoader(true));
};

export default socket;

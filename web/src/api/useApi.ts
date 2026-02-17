import { io } from 'socket.io-client';
import { apiUrl } from './apiUrl';
import { useCallback, useMemo } from 'react';
import { getUserId } from '../utils/getUserId';

const socket = io(apiUrl);

export function useApi() {
  const createRoom = useCallback((roomName: string) => {
    socket.emit('createRoom', { userId: getUserId(), roomName });
  }, []);

  const joinRoom = useCallback((roomName: string) => {
    socket.emit('joinRoom', { userId: getUserId(), roomName });
  }, []);

  const startMatch = useCallback((roomName: string) => {
    socket.emit('startMatch', { userId: getUserId(), roomName });
  }, []);

  return useMemo(
    () => ({
      socket,
      createRoom,
      joinRoom,
      startMatch,
    }),
    [createRoom, joinRoom, startMatch],
  );
}

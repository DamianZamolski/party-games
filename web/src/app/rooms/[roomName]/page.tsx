'use client';
import { use, useCallback, useState } from 'react';
import { useMount } from '../../../utils/useMount';
import { useApi } from '../../../api/useApi';
import { Form } from '../../../components/Form';
import { SubmitButton } from '../../../components/SubmitButton';
import type { Room } from '../../../api/Room';
import { roomSchema } from '../../../api/roomSchema';
import { getUserId } from '../../../utils/getUserId';

export default function RoomPage({
  params,
}: {
  params: Promise<{ roomName: string }>;
}) {
  const api = useApi();
  const { roomName } = use(params);
  const [room, setRoom] = useState<Room>({ users: [] });

  useMount(() => {
    api.joinRoom(roomName);

    api.socket.on('error', (error: unknown) => {
      alert(JSON.stringify(error));
    });

    api.socket.on('startMatch:response', () => {
      alert('match started!');
    });

    api.socket.on('updateRoom', (updatedRoom: unknown) => {
      setRoom(roomSchema.parse(updatedRoom));
    });
  });

  const onStartMatch = useCallback(() => {
    api.startMatch(roomName);
  }, [api, roomName]);

  const isCurrentUserAdmin = room.users.find(
    (user) => user.id === getUserId(),
  )?.isAdmin;

  return (
    <>
      <main>
        <h1>Room: {roomName}</h1>
        <h2>Users:</h2>
        <ul>
          {room.users.map((user) => (
            <li key={user.id}>
              {user.id}
              {user.isAdmin && ' 👑'}
            </li>
          ))}
        </ul>
        {isCurrentUserAdmin && (
          <Form onSubmit={onStartMatch}>
            <SubmitButton>Start Match</SubmitButton>
          </Form>
        )}
      </main>
    </>
  );
}

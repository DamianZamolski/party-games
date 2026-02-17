'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useState, type ChangeEvent } from 'react';
import { createRoomOutputSchema } from '../api/createRoomOutputSchema';
import { useApi } from '../api/useApi';
import { useMount } from '../utils/useMount';
import { Form } from '../components/Form';

export default function HomePage() {
  const api = useApi();
  const router = useRouter();
  const [roomName, setRoomName] = useState('');

  useMount(() => {
    api.socket.on('createRoom:success', (dupa: unknown) => {
      const data = createRoomOutputSchema.parse(dupa);
      router.push(data.url);
    });
  });

  const onRoomNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRoomName(event.target.value);
    },
    [],
  );

  const onSubmit = useCallback(() => {
    api.createRoom(roomName);
  }, [api, roomName]);

  return (
    <>
      <header>
        <h1>Party Games</h1>
      </header>
      <main>
        <Form onSubmit={onSubmit}>
          <input
            placeholder='Room Name'
            onChange={onRoomNameChange}
            autoFocus
          />
          <button type='submit' disabled={roomName.length < 3}>
            Create Room
          </button>
        </Form>
      </main>
    </>
  );
}

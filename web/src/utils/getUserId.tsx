'use client';
import { nanoid } from 'nanoid';

export function getUserId() {
  const userId = localStorage.getItem('userId');

  if (!userId) {
    const newUserId = nanoid();
    localStorage.setItem('userId', newUserId);

    return newUserId;
  }

  return userId;
}

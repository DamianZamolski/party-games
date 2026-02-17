'use client';
import type { ReactNode } from 'react';

export function SubmitButton({
  disabled,
  children,
}: {
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button type='submit' disabled={disabled}>
      {children}
    </button>
  );
}

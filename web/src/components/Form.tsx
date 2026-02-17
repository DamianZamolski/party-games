import { type ReactNode, useCallback, type SubmitEvent } from 'react';

export function Form({
  onSubmit,
  children,
}: {
  onSubmit: () => void;
  children: ReactNode;
}) {
  const handleSubmit = useCallback(
    (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit();
    },
    [onSubmit],
  );

  return <form onSubmit={handleSubmit}>{children}</form>;
}

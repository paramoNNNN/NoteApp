import { useQuery } from 'react-query';
import { useUser } from '../useUser';
import { GetNotesResponse } from './@types';

export const useNotes = () => {
  const { user } = useUser();

  const { isLoading, data } = useQuery<GetNotesResponse>('notes', () =>
    fetch('/api/note/notes', {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
  );

  return { isLoading, data };
};

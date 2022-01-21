import { useQuery } from 'react-query';
import { Note } from '../../pages/api/notes/@types';
import { useUser } from '../useUser';
import { GetNotesResponse } from './@types';

export const useNotes = () => {
  const { user } = useUser();

  const { isLoading, data } = useQuery<GetNotesResponse>('notes', () =>
    fetch(`/api/notes?user=${user}`).then((res) => res.json())
  );

  const upsertNote = (note: Note) => {
    return fetch(`/api/notes/${note.id}?user=${user}`, {
      method: 'POST',
      body: JSON.stringify({ note }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res);
  };

  return { isLoading, data, upsertNote };
};

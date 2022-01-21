import { useQuery } from 'react-query';
import { Note } from '../../pages/api/notes/@types';
import { useUser } from '../useUser';
import { GetNotesResponse } from './@types';
import { deleteNote, upsertNote } from './api';

export const useNotes = () => {
  const { user } = useUser();

  const { isLoading, data, refetch } = useQuery<GetNotesResponse>('notes', () =>
    fetch(`/api/notes?user=${user}`).then((res) => res.json())
  );

  const handleUpsertNote = async (note: Note) => {
    const [data] = await Promise.all([
      await upsertNote({ note, user: user! }),
      await refetch(),
    ]);

    return data;
  };

  const handleDeleteNote = async (noteId: string) => {
    await deleteNote({ noteId, user: user! });
    await refetch();
  };

  return {
    isLoading,
    data,
    upsertNote: handleUpsertNote,
    deleteNote: handleDeleteNote,
  };
};

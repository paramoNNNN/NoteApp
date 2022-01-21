import { useQuery } from 'react-query';
import { GetNotesResponse } from './@types';

export const useNotes = () => {
  const { isLoading, data } = useQuery<GetNotesResponse>('notes', () =>
    fetch('/api/note/notes').then((res) => res.json())
  );

  return { isLoading, data };
};

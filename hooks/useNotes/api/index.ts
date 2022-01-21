import { Note } from '../../../pages/api/notes/@types';

type UpsertNoteParams = {
  note: Note;
  user: string;
};

export const upsertNote = ({ note, user }: UpsertNoteParams) => {
  return fetch(`/api/notes/${note.id}?user=${user}`, {
    method: 'POST',
    body: JSON.stringify({ note }),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};

type DeleteNote = {
  noteId: string;
  user: string;
};

export const deleteNote = ({ noteId, user }: DeleteNote) => {
  return fetch(`/api/notes/${noteId}?user=${user}`, {
    method: 'DELETE',
  }).then((res) => res);
};

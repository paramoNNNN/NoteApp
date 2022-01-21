import { useState } from 'react';
import { useNotes } from '../../../hooks/useNotes';
import { Note } from '../../../pages/api/notes/@types';
import NoteEditor from '../components/Editor';
import type { NoteEditorFields } from '../components/Editor/@types';
import NotesSidebar from '../components/Sidebar';

const NotesContainer = (): JSX.Element => {
  const { isLoading: dataLoading, data, upsertNote, deleteNote } = useNotes();
  const [actionLoading, setActionLoading] = useState<boolean>();
  const [selectedNote, setSelectedNote] = useState<Note>();

  const handleSubmitNote = async (fields: NoteEditorFields) => {
    setActionLoading(true);
    const note = await upsertNote({ ...selectedNote!, ...fields });
    if (note[0]) {
      setSelectedNote(note[0]);
    }
    setActionLoading(false);
  };

  const handleDeleteNote = async (noteId?: string) => {
    setActionLoading(true);
    if (noteId) {
      await deleteNote(noteId);
    }
    setSelectedNote(undefined);
    setActionLoading(false);
  };

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
  };

  const handleNewNote = () => {
    setSelectedNote({ title: '', description: '' });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center p-6">
      <div className="flex relative w-full md:w-5/6 h-full md:h-5/6 bg-white border border-gray-300 rounded-md shadow-sm">
        <NotesSidebar
          notes={data}
          loading={dataLoading}
          selectedNote={selectedNote}
          onSelect={handleNoteSelect}
          onNewNote={handleNewNote}
        />

        <NoteEditor
          note={selectedNote}
          onSubmit={handleSubmitNote}
          onDelete={handleDeleteNote}
          actionLoading={actionLoading}
        />
      </div>
    </div>
  );
};

export default NotesContainer;

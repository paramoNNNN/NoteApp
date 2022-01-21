import { useState } from 'react';
import { useNotes } from '../../../hooks/useNotes';
import { Note } from '../../../pages/api/notes/@types';
import NoteEditor from '../components/Editor';
import type { NoteEditorFields } from '../components/Editor/@types';
import NotesSidebar from '../components/Sidebar';

const NotesContainer = (): JSX.Element => {
  const { isLoading: dataLoading, data, upsertNote } = useNotes();
  const [submitLoading, setSubmitLoading] = useState<boolean>();
  const [selectedNote, setSelectedNote] = useState<Note>();

  const handleSubmitNote = async (fields: NoteEditorFields) => {
    setSubmitLoading(true);
    await upsertNote({ ...selectedNote!, ...fields });
    setSubmitLoading(false);
  };

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center p-6">
      <div className="flex relative w-full md:w-5/6 h-full md:h-5/6 bg-white border border-gray-300 rounded-md shadow-sm">
        <NotesSidebar
          notes={data}
          loading={dataLoading}
          selectedNote={selectedNote}
          onSelect={handleNoteSelect}
        />

        <NoteEditor
          note={selectedNote}
          onSubmit={handleSubmitNote}
          dataLoading={dataLoading}
          submitLoading={submitLoading}
        />
      </div>
    </div>
  );
};

export default NotesContainer;

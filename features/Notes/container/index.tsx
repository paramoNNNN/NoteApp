import { useState } from 'react';
import { useNotes } from '../../../hooks/useNotes';
import NoteEditor from '../components/Editor';
import type { NoteEditorFields } from '../components/Editor/@types';
import NotesSidebar from '../components/Sidebar';

const NotesContainer = (): JSX.Element => {
  const { isLoading, data } = useNotes();
  const [selectedNote, setSelectedNote] = useState<string>();

  const handleSubmitNote = (fields: NoteEditorFields) => {
    console.log({ fields });
  };

  const handleNoteSelect = (id: string) => {
    setSelectedNote(id);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center p-6">
      <div className="flex relative w-full md:w-5/6 h-full md:h-5/6 bg-white border border-gray-300 rounded-md shadow-sm">
        <NotesSidebar
          notes={data}
          loading={isLoading}
          selectedNote={selectedNote}
          onSelect={handleNoteSelect}
        />

        <NoteEditor onSubmit={handleSubmitNote} />
      </div>
    </div>
  );
};

export default NotesContainer;

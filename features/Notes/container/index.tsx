import NoteEditor from '../components/Editor';
import type { NoteEditorFields } from '../components/Editor/@types';
import NotesSidebar from '../components/Sidebar';

const notes = [
  ...[...Array(10)].map((_, index) => ({
    key: index,
    title: `Note ${index + 1}`,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aut veritatis natus dolorem, unde deleniti corrupti nihil blanditiis similique, soluta nostrum! Doloremque porro magnam nihil dolorem iusto. Aspernatur, ducimus quam',
  })),
];

const NotesContainer = (): JSX.Element => {
  const handleSubmitNote = (fields: NoteEditorFields) => {
    console.log({ fields });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-screen h-screen max-w-screen-xl max-h-[1200px] flex justify-center items-center p-6">
        <div className="flex relative w-full md:w-5/6 h-full md:h-5/6 bg-white border border-gray-300 rounded-md shadow-sm">
          <NotesSidebar notes={notes} />

          <NoteEditor onSubmit={handleSubmitNote} />
        </div>
      </div>
    </div>
  );
};

export default NotesContainer;

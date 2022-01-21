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
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="relative w-5/6 h-5/6 bg-white border border-gray-300 rounded-md shadow-sm">
        <NotesSidebar notes={notes} />
      </div>
    </div>
  );
};

export default NotesContainer;

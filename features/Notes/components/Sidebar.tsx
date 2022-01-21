import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/outline';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
import { Note } from '../../../pages/api/notes/@types';

type Props = {
  notes?: Note[];
  loading?: boolean;
  selectedNote?: Note;
  onSelect: (id: Note) => void;
  onNewNote: () => void;
};

const NotesSidebar = ({
  notes,
  loading,
  selectedNote,
  onSelect,
  onNewNote,
}: Props): JSX.Element => {
  const [open, setOpen] = useState(true);
  const { isLarge } = useBreakpoints();

  useEffect(() => {
    if (!isLarge) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isLarge]);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const handleNoteSelect = (note: Note) => {
    onSelect(note);
    if (!isLarge) {
      setOpen(false);
    }
  };

  const handleNewNote = () => {
    onNewNote();
    if (!isLarge) {
      setOpen(false);
    }
  };

  const Notes = () => (
    <>
      {notes?.map(({ id, title, description }) => (
        <li
          key={id}
          className={classNames(
            'py-4 px-8 transition-colors duration-100 cursor-pointer',
            {
              'bg-gray-200 active:bg-gray-300': id === selectedNote?.id,
              'hover:bg-gray-100 active:bg-gray-200': id !== selectedNote?.id,
            }
          )}
          onClick={() => handleNoteSelect({ id, title, description })}
        >
          <span className="text-xl font-medium">{title}</span>
          <p className="truncate text-sm">{description}</p>
        </li>
      ))}
    </>
  );

  return (
    <div
      className={`absolute lg:relative h-full ${
        open ? 'w-full md:w-1/2 lg:w-[300px] lg:min-w-[300px]' : 'w-0'
      } transition-all duration-200 bg-white rounded-md z-10`}
    >
      <button
        className="block lg:hidden absolute -right-4 top-[22px] p-1.5 w-8 h-8 rounded border border-gray-200 bg-white hover:bg-gray-100 transition-colors duration-100"
        onClick={toggleSidebar}
      >
        <ChevronLeftIcon
          className={classNames({ 'transform rotate-180': !open })}
        />
      </button>
      <div
        className={`flex flex-col h-full w-full border-r pt-5 space-y-4 overflow-hidden ${
          open
            ? 'border-transparent md:border-r-gray-200'
            : 'border-transparent'
        }`}
      >
        <div className="flex items-center justify-between pr-8">
          <h3 className="text-3xl font-medium px-8">Notes</h3>

          <button
            className="border border-gray-200 hover:bg-gray-100 active:bg-gray-200 p-1.5 w-8 h-8 rounded shadow-sm transition-colors duration-200"
            onClick={handleNewNote}
          >
            <PlusIcon />
          </button>
        </div>
        <ul className="overflow-y-auto w-full divide-y">
          {!loading ? (
            <Notes />
          ) : (
            <>
              {[...Array(5)].map((_, index) => (
                <div key={index} className="px-4 py-[14px]">
                  <Skeleton className="h-[24px] !w-[80px]" />
                  <Skeleton className="h-[20px]" />
                </div>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotesSidebar;

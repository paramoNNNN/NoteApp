import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useBreakpoints } from '../../../hooks/useBreakpoints';

type Props = {
  notes?: {
    id: string;
    title: string;
    description: string;
  }[];
  loading?: boolean;
  selectedNote?: string;
  onSelect: (id: string) => void;
};

const NotesSidebar = ({
  notes,
  loading,
  selectedNote,
  onSelect,
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

  const handleNoteSelect = (id: string) => {
    onSelect(id);
    if (!isLarge) {
      setOpen(false);
    }
  };

  return (
    <div
      className={`absolute lg:relative h-full ${
        open ? 'w-full md:w-1/2 lg:w-3/12' : 'w-0'
      } transition-all duration-200 bg-white rounded-md`}
    >
      <button
        className="block lg:hidden absolute -right-4 top-5 p-1.5 w-8 h-8 rounded border border-gray-200 bg-white hover:bg-gray-100 transition-colors duration-100"
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
        <h3 className="text-3xl font-medium px-8">Notes</h3>
        <ul className="overflow-y-auto w-full divide-y">
          {!loading ? (
            <>
              {notes?.map(({ id, title, description }) => (
                <li
                  key={id}
                  className={classNames(
                    'py-4 px-8 transition-colors duration-100 cursor-pointer',
                    {
                      'bg-gray-200 active:bg-gray-300': id === selectedNote,
                      'hover:bg-gray-100 active:bg-gray-200':
                        id !== selectedNote,
                    }
                  )}
                  onClick={() => handleNoteSelect(id)}
                >
                  <span className="text-xl font-medium">{title}</span>
                  <p className="truncate text-sm">{description}</p>
                </li>
              ))}
            </>
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

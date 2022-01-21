import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useBreakpoints } from '../../../hooks/useBreakpoints';

type Props = {
  notes: {
    key: number;
    title: string;
    description: string;
  }[];
};

const NotesSidebar = ({ notes }: Props): JSX.Element => {
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

  const handleNoteSelect = () => {
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
          {notes.map(({ key, title, description }) => (
            <li
              key={key}
              className="py-4 px-8 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-100 cursor-pointer"
              onClick={handleNoteSelect}
            >
              <span className="text-xl font-medium">{title}</span>
              <p className="truncate text-sm">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotesSidebar;

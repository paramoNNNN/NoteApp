import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../../components/Button';
import Input from '../../../../components/Inputs/InputField';
import TextArea from '../../../../components/Inputs/TextAreaField';
import { Note } from '../../../../pages/api/notes/@types';
import type { NoteEditorFields } from './@types';

type Props = {
  note?: Note;
  onSubmit: (fields: NoteEditorFields) => void;
  onDelete: (noteId?: string) => Promise<void>;
  actionLoading?: boolean;
};

const NoteEditor = ({ note, onSubmit, onDelete, actionLoading }: Props) => {
  const { register, handleSubmit, setValue, reset } = useForm<NoteEditorFields>(
    {
      defaultValues: { title: note?.title, description: note?.description },
    }
  );

  useEffect(() => {
    if (note) {
      setValue('title', note.title);
      setValue('description', note.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  const handleDelete = async () => {
    await onDelete(note?.id);
    reset();
  };

  if (!note) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-4xl text-gray-400 drop-shadow-sm">Select a note</h1>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col md:justify-between w-full p-6 overflow-auto space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-5">
        <Input
          {...register('title', { required: true })}
          className="max-w-full lg:max-w-sm"
          placeholder="Title"
        />

        <TextArea
          {...register('description', { required: 'true' })}
          inputClassName="min-h-[350px] md:min-h-[200px]"
          placeholder="What happened today?"
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end space-y-reverse space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          type="button"
          className="!bg-red-500 hover:!bg-red-600 !px-8 w-full md:w-auto"
          size="large"
          icon={TrashIcon}
          loading={actionLoading}
          onClick={handleDelete}
        >
          Delete
        </Button>

        <Button
          type="submit"
          className="!px-8 w-full md:w-auto"
          size="large"
          icon={PencilAltIcon}
          loading={actionLoading}
        >
          {note.id ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default NoteEditor;

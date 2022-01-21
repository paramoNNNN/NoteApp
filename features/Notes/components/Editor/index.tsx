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
  onDelete: (noteId: string) => void;
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

  const handleDelete = () => {
    if (note) {
      onDelete(note.id);
    }
    reset();
  };

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

      <div className="flex justify-end space-x-4">
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
          Save
        </Button>
      </div>
    </form>
  );
};

export default NoteEditor;

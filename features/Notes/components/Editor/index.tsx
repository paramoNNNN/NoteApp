import { PencilAltIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import Button from '../../../../components/Button';
import Input from '../../../../components/Inputs/InputField';
import TextArea from '../../../../components/Inputs/TextAreaField';
import type { NoteEditorFields } from './@types';

type Props = {
  onSubmit: (fields: NoteEditorFields) => void;
};

const NoteEditor = ({ onSubmit }: Props) => {
  const { register, handleSubmit } = useForm<NoteEditorFields>();

  return (
    <form
      className="flex flex-col md:justify-between w-full py-5 px-8 overflow-auto space-y-5"
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
          placeholder="What happend today?"
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="!px-8 w-full md:w-auto"
          size="large"
          icon={PencilAltIcon}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default NoteEditor;

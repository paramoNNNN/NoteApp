import { useForm } from 'react-hook-form';
import Button from '../../../components/Button';
import Input from '../../../components/Inputs/InputField';
import { LoginFormFields } from '../@types';

type Props = {
  onSubmit: (fields: LoginFormFields) => void;
};

const LoginForm = ({ onSubmit }: Props): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormFields>({ mode: 'all' });

  return (
    <form
      className="flex flex-col items-end w-full sm:w-auto sm:min-w-[400px] space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register('username', { required: 'true', minLength: 2 })}
        placeholder="Enter your username"
      />

      <Button className="!px-8" type="submit" size="large" disabled={!isValid}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;

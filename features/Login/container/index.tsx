import { useRouter } from 'next/router';
import { useUser } from '../../../hooks/useUser';
import { LoginFormFields } from '../@types';
import LoginForm from '../components/LoginForm';

const LoginContainer = (): JSX.Element => {
  const { setUser } = useUser();
  const { push } = useRouter();

  const handleSubmit = ({ username }: LoginFormFields) => {
    setUser(username);
    push('/');
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full sm:w-auto space-y-10 p-5 bg-white border border-gray-300 rounded-md shadow-sm">
        <h3 className="text-2xl font-semibold">Login</h3>

        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default LoginContainer;

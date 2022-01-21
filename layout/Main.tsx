import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import LoginContainer from '../features/Login/container';
import { useUser } from '../hooks/useUser';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props): JSX.Element => {
  const { user } = useUser();

  if (user === undefined) {
    return <LoginContainer />;
  }

  return <>{children}</>;
};

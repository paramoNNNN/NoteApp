import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useUser } from '../hooks/useUser';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props): JSX.Element => {
  const { user } = useUser();
  const { push } = useRouter();

  useEffect(() => {
    if (user === undefined) {
      push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <>{children}</>;
};

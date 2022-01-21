import { createContext, ReactNode, useEffect, useState } from 'react';
import { USER_KEY } from './consts';

type Context = {
  user?: string;
  setUser: (username: string) => void;
};

export const UserContext = createContext<Context | undefined>(undefined);
const UserProvider = UserContext.Provider;

type Props = {
  children: ReactNode;
};

const UserContextWrapper = ({ children }: Props) => {
  const [user, setUser] = useState<string>();

  useEffect(() => {
    const storedUser = localStorage?.getItem(USER_KEY);
    if (!!storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleSetUser = (username: string) => {
    localStorage.setItem(USER_KEY, username);
    setUser(username);
  };

  return (
    <UserProvider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserProvider>
  );
};

export default UserContextWrapper;

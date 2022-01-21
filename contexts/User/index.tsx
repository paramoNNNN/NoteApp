import { createContext, ReactNode, useState } from 'react';

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

  return <UserProvider value={{ user, setUser }}>{children}</UserProvider>;
};

export default UserContextWrapper;

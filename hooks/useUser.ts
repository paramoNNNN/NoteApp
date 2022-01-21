import { Context, useContext } from 'react';
import { UserContext } from '../contexts/User';

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

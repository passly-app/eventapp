import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { useToast } from '@iziui/react/Toast';

import UserServices, { UserData } from '../services';

export interface UserProviderConfig {
  user?: UserData,

  getUser: (email: string) => Promise<void>;
  updateUser: (user: UserData) => Promise<void>;
}

export const UserContext = createContext<UserProviderConfig>({
  user: undefined,

  getUser: () => Promise.resolve(),
  updateUser: () => Promise.resolve(),
});

export default function UserProvider({ userServices, children }: PropsWithChildren<{
  userServices: UserServices
}>) {
  const { addToast } = useToast();

  const [user, setUser] = useState<UserData>();

  const context = useMemo<UserProviderConfig>(() => ({
    user,

    getUser: (email) => getUser(email),
    updateUser: (user) => updateUser(user)
  }), [user]);

  const getUser = async (email: string) => {
    return userServices.getByEmail(email)
      .then(user => {
        if (!user) { return; }

        setUser(user);
      });
  };

  const updateUser = async (user: UserData) => {
    return userServices.update(user)
      .then(() => addToast({
        color: 'success',
        message: 'Usuário atualizado',
        delay: 5000
      }));
  };

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  );
}
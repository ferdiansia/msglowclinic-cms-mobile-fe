import { FC, createContext, useState } from 'react';
import { IUser } from 'src/models/user.model';

type GlobalContext = {
  API_URL: string;
  user: IUser;
  setUser: () => void;
  loading: boolean;
  setLoading: (data) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GlobalContext = createContext<GlobalContext>({} as GlobalContext);

export const GlobalProvider: FC = ({ children }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [user, setUserState] = useState<IUser>(null);
  const [loading, loadingState] = useState<boolean>(false);
  const setUser = () => {
    setUserState(JSON.parse(localStorage.getItem('currentuser')));
  };
  const setLoading = (data) => {
    const waitTime = data ? 0 : 500;
    setTimeout(() => {
      loadingState(data);
    }, waitTime);
  };

  return (
    <GlobalContext.Provider
      value={{ API_URL, user, setUser, loading, setLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

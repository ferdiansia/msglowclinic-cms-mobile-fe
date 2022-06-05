import { FC, ReactNode, useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';

import axios from 'axios';
import { useNavigate } from 'react-router';
import { USER } from 'src/const/api';
import { GlobalContext } from 'src/contexts/GlobalContext';

axios.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return request;
});

axios.interceptors.response.use((response) => {
  return response;
});

interface SidebarLayoutProps {
  children?: ReactNode;
}

const MainWrapper = styled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            padding-left: ${theme.sidebar.width};
        }
`
);

const MainContent = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
        overflow: auto;
`
);

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const navigate = useNavigate();
  const { API_URL, setUser } = useContext(GlobalContext);

  const getCurrentUser = async () => {
    const { data } = await axios.get(`${API_URL}/${USER}`);
    localStorage.setItem('currentuser', JSON.stringify(data.data));
    setUser();
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
      return;
    }

    getCurrentUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Sidebar />
      <MainWrapper>
        <Header />
        <MainContent>
          <Outlet />
        </MainContent>
      </MainWrapper>
    </>
  );
};

export default SidebarLayout;

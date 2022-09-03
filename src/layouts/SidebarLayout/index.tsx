import { FC, ReactNode, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';

import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'src/redux/store';
import { getUser } from 'src/redux/user/userSlice';
import { _removeAuthenticate } from 'src/utils/storage.service';

axios.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  request.headers[
    'X-PUBLIC-TOKEN'
  ] = `MSCLINIC-8VC7a6LgSHy6ulqyEVDVNIgyUcIZZMi6LEbtK265wuoEgEARAs8TVvknss3VxuLF`;
  return request;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      _removeAuthenticate();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    await dispatch(getUser());
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

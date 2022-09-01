import { useRef, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  Popover,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { removeAuthToken } from 'src/redux/auth/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAlert } from 'react-alert';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const { loading } = useAppSelector((state) => state.auths);
  const { user } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const alert = useAlert();

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const logoutHandler = async () => {
    try {
      const actionResult = await dispatch(removeAuthToken());
      const result = unwrapResult(actionResult);

      if (result) {
        localStorage.removeItem('token');
        navigate('/');
      }
    } catch (err) {
      alert.show(err);
    }
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <AccountCircleTwoToneIcon />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.name || ''}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user?.email || ''}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <AccountCircleTwoToneIcon fontSize={'large'} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.name || ''}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user?.email || ''}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        {/* <Divider sx={{ mb: 0 }} /> */}
        {/* <List sx={{ p: 1 }} component="nav"> */}
        {/* <ListItem button to="/management/profile/details" component={NavLink}>
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary="Change User Profile" />
          </ListItem>
          <ListItem button to="/dashboards/messenger" component={NavLink}>
            <VpnKeyTwoToneIcon fontSize="small" />
            <ListItemText primary="Change Password" />
          </ListItem> */}
        {/* </List> */}
        <Divider />
        <Box sx={{ m: 1 }}>
          <LoadingButton
            onClick={() => logoutHandler()}
            color="primary"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </LoadingButton>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;

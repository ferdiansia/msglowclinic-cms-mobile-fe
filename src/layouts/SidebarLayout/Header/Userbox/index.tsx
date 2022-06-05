import { useContext, useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import { GlobalContext } from 'src/contexts/GlobalContext';
import axios from 'axios';
import { USER } from 'src/const/api';
import { useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';

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
  const { API_URL, user, setUser, loading, setLoading } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const logoutHandler = async () => {
    setLoading(true);
    const { data } = await axios.get(`${API_URL}/${USER}/logout`);
    if (data.data) {
      localStorage.removeItem('currentuser');
      localStorage.removeItem('token');
      setUser();
      navigate('/');
    }
    setLoading(false);
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
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button to="/management/profile/details" component={NavLink}>
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary="Change User Profile" />
          </ListItem>
          <ListItem button to="/dashboards/messenger" component={NavLink}>
            <VpnKeyTwoToneIcon fontSize="small" />
            <ListItemText primary="Change Password" />
          </ListItem>
        </List>
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
